import { Block } from '@/shared/lib/block';

import { AuthController } from '@/features/login-form/controller';

import type { BlockProps } from '@/shared/lib/block';
import { validateForm } from '@/shared/lib/validation';

export class LoginForm extends Block<BlockProps> {
  static componentName = 'LoginForm';

  protected template = `
    {{#> Form title="Вход" buttonText="Авторизоваться" linkText="Зарегистрироваться" linkHref="../register/register.html"}}

      {{{ Input type="text" placeholder="Логин" ref="login" name="login" label="Логин" id="login" className="form__fieldset" }}}

      {{{ Input type="password" placeholder="Пароль" ref="password" name="password" label="Пароль" id="password" className="form__fieldset" }}}

    {{/Form}}
  `;

  private authController = new AuthController();

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

      this.authController.login({
        login: data.login.toString(),
        password: data.password.toString(),
      });
    },
  };
}
