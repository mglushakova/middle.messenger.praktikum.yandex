import { Block } from '@/shared/lib/block';
import type { BlockProps } from '@/shared/lib/block';

import './settings-page.scss';

export class SettingsPage extends Block<BlockProps> {
  protected template = `{{#> profile-page}}
                          {{> avatar-button}}
                          <h1 class="profile__name heading-m">Иван</h1>
                          <ul class="profile__list">
                            {{> profile-item category="Почта" value="pochta@yandex.ru"}}
                            {{> profile-item category="Логин" value="ivanivanov"}}
                            {{> profile-item category="Имя" value="Иван"}}
                            {{> profile-item category="Фамилия" value="Иванов"}}
                            {{> profile-item category="Имя в чате" value="Иван"}}
                            {{> profile-item category="Телефон" value="+7 (909) 967 30 30"}}
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
                              <a href="../exit.html" class="link link_size_medium link_type_danger"
                                >Выйти</a
                              >
                            </li>
                          </ul>
                          {{/profile-page}}`;
}
