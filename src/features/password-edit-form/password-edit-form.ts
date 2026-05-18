import { Block } from '@/shared/lib/block';

import type { BlockProps } from '@/shared/lib/block';
import { validateForm } from '@/shared/lib/validation';

export class PasswordEditForm extends Block<BlockProps> {
  static componentName = 'PasswordEditForm';

  protected template = `
    {{#> Form buttonText="Сохранить" isProfile=true }}
      {{{ Input type="password" isProfile=true ref="password" name="password" label="Старый пароль" id="password" className="profile-form__fieldset" value="testpassword" }}}
      {{{ Input type="password" isProfile=true ref="new_password" name="new_password" label="Новый пароль" id="new_password" className="profile-form__fieldset" }}}
      {{{ Input type="password" isProfile=true ref="new_password-confirm" name="new_password-confirm" label="Повторите новый пароль" id="new_password-confirm" className="profile-form__fieldset" }}}
    {{/Form}}
  `;

  protected events = {
    submit: (event: Event) => {
      event.preventDefault();

      const form = event.target as HTMLFormElement;

      const formData = new FormData(form);

      const data: Record<string, FormDataEntryValue> = {};

      formData.forEach((value, key) => {
        data[key] = value;
      });

      const isValid = validateForm(form);

      if (!isValid) {
        console.log('Форма невалидна');
        return;
      }

      console.log(data);
    },
  };
}
