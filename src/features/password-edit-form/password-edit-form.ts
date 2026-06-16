import { userController } from '@/entities/user';
import { Block } from '@/shared/lib/block/block';

import type { BlockProps } from '@/shared/lib/block/block';
import { validateForm } from '@/shared/lib/validation';
import { connect } from '@/shared/store';

type PasswordEditFormProps = BlockProps & {
  error?: string | null;
};

const withError = connect((state) => {
  return {
    error: state.profile?.error,
  };
});

function passwordsMatch(form: HTMLFormElement): boolean {
  const newPassword = (
    form.elements.namedItem('new_password') as HTMLInputElement
  ).value;

  const confirmPassword = (
    form.elements.namedItem('new_password-confirm') as HTMLInputElement
  ).value;

  return newPassword === confirmPassword;
}

export class PasswordEditForm extends Block<PasswordEditFormProps> {
  static componentName = 'PasswordEditForm';

  protected template = `
    {{#> Form buttonText="Сохранить" isProfile=true error=error }}
      {{{ Input type="password" isProfile=true ref="password" name="password" label="Старый пароль" id="password" className="profile-form__fieldset" }}}
      {{{ Input type="password" isProfile=true ref="new_password" name="new_password" label="Новый пароль" id="new_password" className="profile-form__fieldset" }}}
      {{{ Input type="password" isProfile=true ref="new_password-confirm" name="new_password-confirm" label="Повторите новый пароль" id="new_password-confirm" className="profile-form__fieldset" }}}
    {{/Form}}
  `;

  protected events = {
    submit: (event: Event) => {
      event.preventDefault();

      userController.clearError();

      const form = event.target as HTMLFormElement;

      const formData = new FormData(form);

      const data: Record<string, FormDataEntryValue> = {};

      formData.forEach((value, key) => {
        data[key] = value;
      });

      const isValid = validateForm(form);

      if (!passwordsMatch(form)) {
        userController.setError('Новые пароли не совпадают');
        return;
      }

      if (!isValid) {
        userController.setError('Пожалуйста, исправьте ошибки в форме');
        return;
      }

      userController.changePassword({
        oldPassword: data.password.toString(),
        newPassword: data.new_password.toString(),
      });
    },
  };
}

export const passwordEditForm = withError(PasswordEditForm);
