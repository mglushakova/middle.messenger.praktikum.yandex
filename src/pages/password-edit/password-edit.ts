import { Block } from '@/shared/lib/block';
import type { BlockProps } from '@/shared/lib/block';

import './password-edit.scss';
export class PasswordEditPage extends Block<BlockProps> {
  protected template = `<div class="password-edit">
                          {{#> profile-page}}
                          {{{ AvatarUpload }}}
                          <div class="password-edit__form">
                            {{{ PasswordEditForm }}}
                          </div>
                          {{/profile-page}}
                        </div>
                        `;
}
