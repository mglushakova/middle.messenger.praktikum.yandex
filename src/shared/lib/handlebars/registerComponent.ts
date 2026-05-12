import type { HelperOptions } from 'handlebars';
import Handlebars from 'handlebars';
import { Block, type BlockProps } from '@/shared/lib/block';

type BlockClass<P extends BlockProps = BlockProps> = {
  new (props: P): Block<P>;
  componentName: string;
};

let uniqueId = 0;

function registerComponent<P extends BlockProps>(Component: BlockClass<P>) {
  console.log('REGISTER HELPER', Component.componentName);
  Handlebars.registerHelper(
    Component.componentName,
    function ({ hash, data }: HelperOptions) {
      console.log('HELPER CALLED', Component.componentName);
      const dataAttribute = `data-component-hbs-id="${++uniqueId}"`;
      const component = new Component(hash as P);

      if ('ref' in hash) {
        (data.root.__refs = data.root.__refs || {})[hash.ref] =
          component.element();
      }

      (data.root.__children = data.root.__children || []).push({
        component,
        embed(node: DocumentFragment) {
          console.log('EMBED', Component.componentName);
          const placeholder = node.querySelector(`[${dataAttribute}]`);
          if (!placeholder) {
            throw new Error(
              `Can't find data-id for component ${Component.componentName}`,
            );
          }

          const element = component.element();
          if (element) {
            placeholder.replaceWith(element);
          }
        },
      });

      return new Handlebars.SafeString(`<div ${dataAttribute}></div>`);
    },
  );
}

export { registerComponent };
