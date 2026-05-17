import { Block } from '@/shared/lib/block';
import type { BlockProps } from '@/shared/lib/block';

export class PasswordEditPage extends Block<BlockProps> {
  protected template = `<div class="password-edit">
                          {{#> profile-page}}
                          {{> avatar-button}}
                          <div class="password-edit__form">
                            {{{ PasswordEditForm }}}
                          </div>
                          {{/profile-page}}
                        </div>
                        `;
}
