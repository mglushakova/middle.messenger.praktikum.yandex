import Block from '@/shared/lib/block';
import type { BlockProps } from '@/shared/lib/block';

import { validate } from '@/shared/lib/validation';

interface InputProps extends BlockProps {
  name: string;
  type?: string;
  placeholder?: string;
}

export class Input extends Block<InputProps> {
  static componentName = 'Input';

  protected template = `
    <fieldset class="input {{ className }} {{#if error}}input_state_error{{/if}}">
      <div class="input__wrapper">
        <label for="{{ id }}" class="input__label">
          {{ label }}
        </label>
        <input
          type="{{ type }}"
          name="{{ name }}"
          id="{{ id }}"
          class="input__input"
          value="{{ value }}"
        />
      </div>

      {{#if error}}
      <p class="input__error">{{ error }}</p>
      {{/if}}
    </fieldset>
  `;

  protected events = {
    blur: (event: Event) => {
      const target = event.target as HTMLInputElement;

      const error = validate(target.name, target.value);

      const errorElement = this.refs.error;

      if (errorElement) {
        errorElement.textContent = error ?? '';
      }
    },
  };
}
