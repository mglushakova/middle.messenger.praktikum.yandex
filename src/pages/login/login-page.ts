import { Block } from '@/shared/lib/block';
import type { BlockProps } from '@/shared/lib/block';

export class LoginPage extends Block<BlockProps> {
  protected template = `{{#> form-page}}
                          {{{ LoginForm }}}
                        {{/form-page}}`;
}
