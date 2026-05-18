import { Block } from '@/shared/lib/block';
import type { BlockProps } from '@/shared/lib/block';

import { validate } from '@/shared/lib/validation';
import './input.scss';
import './profile-input.scss';

interface InputProps extends BlockProps {
  id: string;
  name: string;
  type?: string;
  placeholder?: string;

  label?: string;
  value?: string;
  className?: string;
  error?: string;
  isProfile?: boolean;
}

export class Input extends Block<InputProps> {
  static componentName = 'Input';

  protected template = `
    {{#if isProfile}}
      <fieldset
        class="profile-input {{
          className
        }} {{#if error}}profile-input_state_error{{/if}}"
      >
        <div class="profile-input__wrapper">
          <label for="{{ id }}" class="profile-input__label">
            {{ label }}
          </label>
          <input
            type="{{ type }}"
            name="{{ name }}"
            id="{{ id }}"
            class="profile-input__input"
            value="{{ value }}"
          />
        </div>

        <p class="profile-input__error">{{ error }}</p>
      </fieldset>
      {{else}}
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
      {{/if}}
  `;

  protected events = {
    focusout: (event: Event) => {
      const input = event.target as HTMLInputElement;

      const error = validate(input.name, input.value);

      const root = this.element();

      const errorClass = this.props.isProfile
        ? 'profile-input_state_error'
        : 'input_state_error';

      const errorSelector = this.props.isProfile
        ? '.profile-input__error'
        : '.input__error';

      root?.classList.toggle(errorClass, Boolean(error));

      const errorElement = root?.querySelector(errorSelector);

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
