import { Block } from '@/shared/lib/block';

import type { BlockProps } from '@/shared/lib/block';
import { validateForm } from '@/shared/lib/validation';
import { authController } from '../auth-controller';
import { connect } from '@/shared/store';

type LoginFormProps = BlockProps & {
  error?: string | null;
};

const withAuthError = connect((state) => ({
  error: state.auth?.error,
}));

export class LoginForm extends Block<LoginFormProps> {
  static componentName = 'LoginForm';

  protected template = `
    {{#> Form title="Вход" buttonText="Авторизоваться" linkText="Зарегистрироваться" linkHref="/sign-up" error=error }}

      {{{ Input type="text" placeholder="Логин" ref="login" name="login" label="Логин" id="login" className="form__fieldset" }}}

      {{{ Input type="password" placeholder="Пароль" ref="password" name="password" label="Пароль" id="password" className="form__fieldset" }}}

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
        authController.setError('Пожалуйста, исправьте ошибки в форме');
        return;
      }

      authController.signin({
        login: data.login.toString(),
        password: data.password.toString(),
      });
    },
    input: () => {
      authController.clearError();
    },
  };
}

export const loginForm = withAuthError(LoginForm);
