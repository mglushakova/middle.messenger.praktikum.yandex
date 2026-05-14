import { Block } from '@/shared/lib/block';

import type { BlockProps } from '@/shared/lib/block';
import { validateForm } from '@/shared/lib/validation';

export class RegisterForm extends Block<BlockProps> {
  static componentName = 'RegisterForm';

  protected template = `
    {{#> Form title="Регистрация" buttonText="Зарегистрироваться" linkText="Войти" linkHref="../login/login.html"}}

      {{{ Input type="text" placeholder="Почта" ref="email" name="email" label="Почта" id="email" className="form__fieldset" }}}
      {{{ Input type="text" placeholder="Логин" ref="login" name="login" label="Логин" id="login" className="form__fieldset" }}}
      {{{ Input type="text" placeholder="Имя" ref="name" name="name" label="Имя" id="name" className="form__fieldset" }}}
      {{{ Input type="text" placeholder="Фамилия" ref="surname" name="surname" label="Фамилия" id="surname" className="form__fieldset" }}}
      {{{ Input type="text" placeholder="Телефон" ref="phone" name="phone" label="Телефон" id="phone" className="form__fieldset" }}}
      {{{ Input type="text" placeholder="Пароль" ref="password" name="password" label="Пароль" id="password" className="form__fieldset" }}}
      {{{ Input type="text" placeholder="Пароль еще раз" ref="password-confirm" name="password-confirm" label="Пароль еще раз" id="password-confirm" className="form__fieldset" }}}

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
