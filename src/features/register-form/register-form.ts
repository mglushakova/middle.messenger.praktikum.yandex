import { Block } from '@/shared/lib/block';
import type { BlockProps } from '@/shared/lib/block';
import { validateForm } from '@/shared/lib/validation';
import { authController } from '../auth';
import { connect } from '@/shared/store';

type RegisterFormProps = BlockProps & {
  error?: string | null;
};

const withAuthError = connect((state) => ({
  error: state.auth?.error,
}));

class RegisterForm extends Block<RegisterFormProps> {
  static componentName = 'RegisterForm';

  protected template = `
    {{#> Form title="Регистрация" buttonText="Зарегистрироваться" linkText="Войти" linkHref="/" error=error}}

      {{{ Input type="text" placeholder="Почта" ref="email" name="email" label="Почта" id="email" className="form__fieldset" }}}
      {{{ Input type="text" placeholder="Логин" ref="login" name="login" label="Логин" id="login" className="form__fieldset" }}}
      {{{ Input type="text" placeholder="Имя" ref="first_name" name="first_name" label="Имя" id="first_name" className="form__fieldset" }}}
      {{{ Input type="text" placeholder="Фамилия" ref="second_name" name="second_name" label="Фамилия" id="second_name" className="form__fieldset" }}}
      {{{ Input type="text" placeholder="Телефон" ref="phone" name="phone" label="Телефон" id="phone" className="form__fieldset" }}}
      {{{ Input type="password" placeholder="Пароль" ref="password" name="password" label="Пароль" id="password" className="form__fieldset" }}}
      {{{ Input type="password" placeholder="Пароль еще раз" ref="password-confirm" name="password-confirm" label="Пароль еще раз" id="password-confirm" className="form__fieldset" }}}

    {{/Form}}
  `;

  protected events = {
    submit: (event: Event) => {
      event.preventDefault();

      authController.clearError();

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

      authController.signup({
        first_name: data.first_name.toString(),
        second_name: data.second_name.toString(),
        login: data.login.toString(),
        email: data.email.toString(),
        password: data.password.toString(),
        phone: data.phone.toString(),
      });
    },
    input: () => {
      authController.clearError();
    },
  };
}

export default withAuthError(RegisterForm);
