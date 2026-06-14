import { Block } from '@/shared/lib/block/block';
import type { BlockProps } from '@/shared/lib/block/block';

import './profile-edit.scss';
export class ProfileEditPage extends Block<BlockProps> {
  protected template = `<div class="profile-edit">
                          {{#> profile-page}}
                          {{{ AvatarUpload }}}
                          <div class="profile-edit__form">
                            {{{ ProfileEditForm }}}
                          </div>
                          {{/profile-page}}
                        </div>
                        `;
}
