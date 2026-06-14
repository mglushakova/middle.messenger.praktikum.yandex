import { Block } from '@/shared/lib/block/block';
import type { BlockProps } from '@/shared/lib/block/block';

export class SignUpPage extends Block<BlockProps> {
  protected template = `{{#> form-page}}
                          {{{ RegisterForm }}}
                        {{/form-page}}`;
}
