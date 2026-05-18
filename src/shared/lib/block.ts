import Handlebars from 'handlebars';
type EventListType = Partial<
  Record<keyof HTMLElementEventMap, (e: Event) => void>
>;
export interface BlockProps {
  __children?: Array<{
    component: Block<BlockProps>;
    embed(node: DocumentFragment): void;
  }>;
  __refs?: Record<string, Element>;
}
export abstract class Block<Props extends BlockProps> {
  protected abstract template: string;
  protected props = {} as Props;
  private domElement: Element | null = null;
  protected events: EventListType = {};
  protected refs: Record<string, Element> = {};
  protected children: Block<BlockProps>[] = [];

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
    const props = {
      ...this.props,
      __children: [],
      __refs: {},
    };

    const html = Handlebars.compile(this.template)(props);

    const templateElement = document.createElement('template');

    templateElement.innerHTML = html;

    const fragment = templateElement.content;

    if (props.__children) {
      this.children = props.__children.map((child) => child.component);

      props.__children.forEach((child) => {
        child.embed(fragment);
      });
    }

    this.refs = props.__refs ?? {};

    return fragment.firstElementChild;
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
      this.children.reverse().forEach((child) => child.unmountComponent());
      this.componentWillUnmount();
      this.removeListeners();
    }
  }
  private attachListeners() {
    Object.entries(this.events).forEach(([eventName, eventCallback]) => {
      if (typeof eventCallback === 'function' && this.domElement) {
        this.domElement.addEventListener(
          eventName as keyof HTMLElementEventMap,
          eventCallback,
        );
      }
    });
  }
  private removeListeners() {
    Object.entries(this.events).forEach(([eventName, eventCallback]) => {
      if (typeof eventCallback === 'function' && this.domElement) {
        this.domElement.removeEventListener(eventName, eventCallback);
      }
    });
  }
}
