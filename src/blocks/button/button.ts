import Block from '@/blocks/block/block';
import type {BlockOwnProps} from '@/blocks/block/block';

interface ButtonProps extends BlockOwnProps {
    label: string;
    ref?: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (event: Event) => void;
}

class Button extends Block<ButtonProps> {
  static componentName = 'Button';
  protected template = `<button ref="{{ref}}" type="{{ type }}">{{ label }}</button>`;

  protected events = {
    click: (event: Event) => {
      this.props?.onClick?.(event);
    },
  };
}

export {Button};
