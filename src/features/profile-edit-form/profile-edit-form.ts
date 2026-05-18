import { Block } from '@/shared/lib/block';

import type { BlockProps } from '@/shared/lib/block';
import { validateForm } from '@/shared/lib/validation';

export class ProfileEditForm extends Block<BlockProps> {
  static componentName = 'ProfileEditForm';

  protected template = `
    {{#> Form buttonText="Сохранить" isProfile=true }}
      {{{ Input type="text" isProfile=true ref="email" name="email" label="Почта" id="email" className="profile-form__fieldset" value="pochta@yandex.ru" }}}
      {{{ Input type="text" isProfile=true ref="login" name="login" label="Логин" id="login" className="profile-form__fieldset" value="ivanivanov" }}}
      {{{ Input type="text" isProfile=true ref="first_name" name="first_name" label="Имя" id="first_name" className="profile-form__fieldset" value="Иван" }}}
      {{{ Input type="text" isProfile=true ref="second_name" name="second_name" label="Фамилия" id="second_name" className="profile-form__fieldset" value="Иванов" }}}
      {{{ Input type="text" isProfile=true ref="chat-name" name="chat-name" label="Имя в чате" id="chat-name" className="profile-form__fieldset" value="Иван" }}}
      {{{ Input type="text" isProfile=true ref="phone" name="phone" label="Телефон" id="phone" className="profile-form__fieldset" value="+7 (909) 967 30 30" }}}
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
