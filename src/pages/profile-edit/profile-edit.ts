import { Block } from '@/shared/lib/block/block';
import type { BlockProps } from '@/shared/lib/block/block';

import './profile-edit.scss';
export class ProfileEditPage extends Block<BlockProps> {
  protected template = `
    <div class="profile-edit">
      <main>
        <div class="profile-page">
          {{{ ProfileBackNav }}}
          <section class="profile-page__content">
            {{{ AvatarUpload }}}
            <div class="profile-edit__form">
              {{{ ProfileEditForm }}}
            </div>
          </section>
        </div>
      </main>
    </div>
  `;
}
