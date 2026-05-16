import { Block } from '@/shared/lib/block';
import type { BlockProps } from '@/shared/lib/block';

export class ProfileEditPage extends Block<BlockProps> {
  protected template = `<div class="profile-edit">
                          {{#> profile-page}}
                          {{> avatar-button}}
                          <div class="profile-edit__form">
                            {{{ ProfileEditForm }}}
                          </div>
                          {{/profile-page}}
                          <div></div>
                        </div>
                        `;
}
