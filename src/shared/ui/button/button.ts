import { Block } from '@/shared/lib/block';
import type { BlockProps } from '@/shared/lib/block';

interface ButtonProps extends BlockProps {
  label: string;
  type?: 'button' | 'submit';
  onClick?: (event: Event) => void;
}

export class Button extends Block<ButtonProps> {
  static componentName = 'Button';

  protected template = `
    <button type="{{type}}" class="button">
      {{label}}
    </button>
  `;

  protected events = {
    click: (event: Event) => {
      this.props.onClick?.(event);
    },
  };
}
