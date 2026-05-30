import { Block } from '@/shared/lib/block';
import type { BlockProps } from '@/shared/lib/block';

export class NotFoundPage extends Block<BlockProps> {
  protected template = `{{#>error-page
                            title="404"
                            description="Не туда попали"
                            linkHref="/messenger"
                            linkText="Назад к чатам"}}
                        {{/error-page}}`;
}
