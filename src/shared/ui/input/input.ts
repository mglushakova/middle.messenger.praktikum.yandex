import { Block } from '@/shared/lib/block';
import type { BlockProps } from '@/shared/lib/block';

import { validate } from '@/shared/lib/validation';
import './input.scss';

interface InputProps extends BlockProps {
  id: string;
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

      <p class="input__error">{{ error }}</p>
    </fieldset>
  `;

  protected events = {
    focusout: (event: Event) => {
      const input = event.target as HTMLInputElement;

      const error = validate(input.name, input.value);

      const root = this.element();

      root?.classList.toggle('input_state_error', Boolean(error));

      const errorElement = root?.querySelector('.input__error');

      if (errorElement) {
        errorElement.textContent = error ?? '';
      }
    },

    input: (event: Event) => {
      const input = event.target as HTMLInputElement;

      const root = this.element();

      root?.classList.toggle('is-filled', Boolean(input.value));
    },
  };
}
