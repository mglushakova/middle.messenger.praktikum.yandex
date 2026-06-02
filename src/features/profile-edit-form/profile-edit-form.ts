import { Block } from '@/shared/lib/block';

import type { BlockProps } from '@/shared/lib/block';
import { validateForm } from '@/shared/lib/validation';
import { connect } from '@/shared/store';
import profileEditController from './profile-edit-controller';
import type { User } from '@/entities/user';

type ProfileEditFormProps = BlockProps & {
  user: User | null;
  error?: string | null;
};

const withProfile = connect((state) => {
  return {
    user: state.user,
    error: state.profile?.error,
  };
});

export class ProfileEditForm extends Block<ProfileEditFormProps> {
  static componentName = 'ProfileEditForm';

  protected template = `
    {{#> Form buttonText="Сохранить" isProfile=true error=error }}
      {{{ Input type="text" isProfile=true ref="email" name="email" label="Почта" id="email" className="profile-form__fieldset" value=user.email }}}
      {{{ Input type="text" isProfile=true ref="login" name="login" label="Логин" id="login" className="profile-form__fieldset" value=user.login }}}
      {{{ Input type="text" isProfile=true ref="first_name" name="first_name" label="Имя" id="first_name" className="profile-form__fieldset" value=user.first_name }}}
      {{{ Input type="text" isProfile=true ref="second_name" name="second_name" label="Фамилия" id="second_name" className="profile-form__fieldset" value=user.second_name }}}
      {{{ Input type="text" isProfile=true ref="chat-name" name="display_name" label="Имя в чате" id="chat-name" className="profile-form__fieldset" value=user.display_name }}}
      {{{ Input type="text" isProfile=true ref="phone" name="phone" label="Телефон" id="phone" className="profile-form__fieldset" value=user.phone }}}
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
        profileEditController.setError('Пожалуйста, исправьте ошибки в форме');
        return;
      }

      profileEditController.changeProfile({
        first_name: data.first_name.toString(),
        second_name: data.second_name.toString(),
        display_name: data.display_name.toString(),
        login: data.login.toString(),
        email: data.email.toString(),
        phone: data.phone.toString(),
      });
    },
    input: () => {
      profileEditController.clearError();
    },
  };
}

export default withProfile(ProfileEditForm);
