import { Block } from '@/shared/lib/block';

import type { BlockProps } from '@/shared/lib/block';
import { validateForm } from '@/shared/lib/validation';

export class PasswordEditForm extends Block<BlockProps> {
  static componentName = 'PasswordEditForm';

  protected template = `
    {{#> Form buttonText="Сохранить" isProfile=true }}
      {{{ Input type="password" isProfile=true ref="password" name="password" label="Старый пароль" id="password" className="profile-form__fieldset" value="testpassword" }}}
      {{{ Input type="password" isProfile=true ref="new-password" name="new-password" label="Новый пароль" id="new-password" className="profile-form__fieldset" }}}
      {{{ Input type="password" isProfile=true ref="new-password-confirm" name="new-password-confirm" label="Новый пароль" id="new-password-confirm" className="profile-form__fieldset" }}}
    {{/Form}}
  `;

  protected events = {
    submit: (event: Event) => {
      event.preventDefault();

      // const loginInput = this.refs.login as HTMLInputElement;

      // const passwordInput = this.refs.password as HTMLInputElement;

      const form = event.target as HTMLFormElement;

      const formData = new FormData(form);

      const data = Object.fromEntries(formData.entries());

      const isValid = validateForm(form);

      if (!isValid) {
        console.log('Форма невалидна');
        return;
      }

      console.log(data);
    },
  };
}
