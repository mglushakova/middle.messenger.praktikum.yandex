import { Block } from '@/shared/lib/block';

import type { BlockProps } from '@/shared/lib/block';
import { validateForm } from '@/shared/lib/validation';

export class RegisterForm extends Block<BlockProps> {
  static componentName = 'RegisterForm';

  protected template = `
    {{#> Form title="Регистрация" buttonText="Зарегистрироваться" linkText="Войти" linkHref="../login/login.html"}}

      {{{ Input type="text" placeholder="Почта" ref="email" name="email" label="Почта" id="email" className="form__fieldset" }}}
      {{{ Input type="text" placeholder="Логин" ref="login" name="login" label="Логин" id="login" className="form__fieldset" }}}
      {{{ Input type="text" placeholder="Имя" ref="first_name" name="first_name" label="Имя" id="first_name" className="form__fieldset" }}}
      {{{ Input type="text" placeholder="Фамилия" ref="second_name" name="second_name" label="Фамилия" id="second_name" className="form__fieldset" }}}
      {{{ Input type="text" placeholder="Телефон" ref="phone" name="phone" label="Телефон" id="phone" className="form__fieldset" }}}
      {{{ Input type="text" placeholder="Пароль" ref="password" name="password" label="Пароль" id="password" className="form__fieldset" }}}
      {{{ Input type="text" placeholder="Пароль еще раз" ref="password-confirm" name="password-confirm" label="Пароль еще раз" id="password-confirm" className="form__fieldset" }}}

    {{/Form}}
  `;

  protected events = {
    submit: (event: Event) => {
      event.preventDefault();

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
