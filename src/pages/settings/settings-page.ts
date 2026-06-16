import { Block } from '@/shared/lib/block/block';
import type { BlockProps } from '@/shared/lib/block/block';

import './settings-page.scss';
import type { User } from '@/entities/user';
import { connect } from '@/shared/store';

type SettingsPageProps = BlockProps & {
  user: User | null;
};

const withUser = connect((state) => ({
  user: state.user,
}));

class SettingsPage extends Block<SettingsPageProps> {
  static componentName = 'SettingsPage';

  protected template = `
    <main>
      <div class="profile-page">
        {{{ ProfileBackNav }}}
        <section class="profile-page__content">
          {{{ AvatarUpload }}}
          <h1 class="profile__name heading-m">{{user.first_name}}</h1>
          <ul class="profile__list">
            {{> profile-item category="Почта" value=user.email}}
            {{> profile-item category="Логин" value=user.login}}
            {{> profile-item category="Имя" value=user.first_name}}
            {{> profile-item category="Фамилия" value=user.second_name}}
            {{> profile-item category="Имя в чате" value=user.display_name}}
            {{> profile-item category="Телефон" value=user.phone}}
          </ul>
          <ul class="profile__links">
            <li class="profile__link-item">
              <a href="/settings/profile" class="link link_size_medium"
                >Изменить данные</a
              >
            </li>
            <li class="profile__link-item">
              <a href="/settings/password" class="link link_size_medium"
                >Изменить пароль</a
              >
            </li>
            <li class="profile__link-item">
              {{{ LogoutLink }}}
            </li>
          </ul>
        </section>
      </div>
    </main>
  `;
}

export const settingsPage = withUser(SettingsPage);
