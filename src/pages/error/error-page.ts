import { Block } from '@/shared/lib/block';
import type { BlockProps } from '@/shared/lib/block';

export class ErrorPage extends Block<BlockProps> {
  protected template = `{{#>error-page
                            title="500"
                            description="Мы уже фиксим"
                            linkHref="/messenger"
                            linkText="Назад к чатам"}}
                        {{/error-page}}`;
}
