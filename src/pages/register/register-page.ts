import { Block } from '@/shared/lib/block';
import type { BlockProps } from '@/shared/lib/block';

export class RegisterPage extends Block<BlockProps> {
  protected template = `{{#> form-page}}
                          {{{ RegisterForm }}}
                        {{/form-page}}`;
}
