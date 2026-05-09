import Block from '@/blocks/block/block';
import type {BlockOwnProps} from '@/blocks/block/block';

interface InputProps extends BlockOwnProps {
    ref?: string;
    placeholder?: string;
    type?: 'text' | 'password' | 'email' | 'tel' | 'url' | 'number' | 'search';
    onBlur?: (event: Event) => void;
}

class Input extends Block<InputProps> {
  static componentName = 'Input';
  protected template = `<input type="{{ type }}" placeholder="{{ placeholder }}" ref="{{ref}}">`;

  protected events = {
    blur: (event: Event) => {
      this.props?.onBlur?.(event);
    },
  };
}

export {Input};
