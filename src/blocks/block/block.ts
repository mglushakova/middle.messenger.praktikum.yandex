import Handlebars from 'handlebars';

type EventListType = Partial<Record<keyof HTMLElementEventMap, (e: Event) => void>>;

export interface BlockOwnProps extends Object {
  __children?: Array<{
    component: Block<object>;
    embed(node: DocumentFragment): void;
  }>;
  __refs?: Record<string, Element>;
}

export default abstract class Block<Props extends BlockOwnProps> {
    protected abstract template: string;

    protected props = {} as Props;

    private domElement: Element | null = null;

    protected events: EventListType = {}; 

    protected refs: Record<string, Element> = {};

    protected children: Block<object>[] = [];

    constructor(props: Props = {} as Props) {
        this.props = props;
    } 

    public element(): Element | null {
        if (!this.domElement) {
            this.render();
        }

        return this.domElement;
    } 

    protected render() {
        this.unmountComponent();
        const fragment = this.compile();

        if (this.domElement && fragment) {
            this.domElement.replaceWith(fragment);
        }

        this.domElement = fragment;
        this.mountComponent();
    } 

    private compile(): Element | null {
        const html = Handlebars.compile(this.template)(this.props);
        const templateElement = document.createElement("template");

        templateElement.innerHTML = html;
        const fragment = templateElement.content;

        if (this.props.__children) {
            this.children = this.props.__children.map((child) => child.component);

            this.props.__children.forEach((child) => {
            child.embed(fragment);
            });
        }

        const defaultRefs = this.props?.__refs ?? {};

        this.refs = Array.from(fragment.querySelectorAll('[ref]')).reduce(
            (list, element) => {
                const key = element.getAttribute('ref');
                if (key) {
                    list[key] = element as HTMLElement;
                }
                element.removeAttribute('ref');
                return list;
                },
            defaultRefs 
        );

        return templateElement.content.firstElementChild;
    } 

    public setProps(props: Partial<Props>) {
        this.props = { ...this.props, ...props, __children: [], __refs: {} };
        this.render();
    } 

    protected componentDidMount() {}

    private mountComponent() {
        this.attachListeners();
        this.componentDidMount();
    }

    protected componentWillUnmount() {}

    private unmountComponent() {
        if (this.domElement) {
            this.children.reverse().forEach(child => child.unmountComponent());
            this.componentWillUnmount();
            this.removeListeners();
        }
    }

    private attachListeners() {
        Object.entries(this.events).forEach(([eventName, eventCallback]) => {
            if (typeof eventCallback === 'function' && this.domElement) {
                this.domElement.addEventListener(
                    eventName as keyof HTMLElementEventMap,
                    eventCallback
                );
            }
        });
    } 

    private removeListeners() {
        Object.entries(this.events).forEach(([eventName, eventCallback]) => {
            if (typeof eventCallback === "function" && this.domElement) {
                this.domElement.removeEventListener(eventName, eventCallback);
            }
        });
    } 
} 

