import { chatsController } from '@/entities/chats';
import { Block } from '@/shared/lib/block/block';
import type { BlockProps } from '@/shared/lib/block/block';

import { closeModal } from '@/shared/lib/modal';

export class CreateChatModal extends Block<BlockProps> {
  static componentName = 'CreateChatModal';

  protected template = `
    {{#> Modal noPadding=true}}
      {{#> Form title="Создать чат" buttonText="Создать" isModal=true }}
        {{{ Input type="text" placeholder="Название" ref="title" name="title" label="Название" id="title" className="form__fieldset" }}}
      {{/Form}}
    {{/Modal}}
  `;

  protected events = {
    submit: async (event: Event) => {
      event.preventDefault();

      const form = event.target as HTMLFormElement;

      const formData = new FormData(form);

      const title = formData.get('title');

      if (!title || typeof title !== 'string') {
        return;
      }

      await chatsController.createChat(title);
    },

    click: (event: Event) => {
      const target = event.target as HTMLElement;

      if (
        target.classList.contains('modal__close') ||
        target.classList.contains('modal')
      ) {
        closeModal();
      }
    },
  };
}
