import { Block } from '@/shared/lib/block/block';
import type { BlockProps } from '@/shared/lib/block/block';

import './password-edit.scss';
export class PasswordEditPage extends Block<BlockProps> {
  protected template = `
    <div class="password-edit">
      <main>
        <div class="profile-page">
          {{{ ProfileBackNav }}}
          <section class="profile-page__content">
            {{{ AvatarUpload }}}
            <div class="password-edit__form">
              {{{ PasswordEditForm }}}
            </div>
          </section>
        </div>
      </main>
    </div>
  `;
}
