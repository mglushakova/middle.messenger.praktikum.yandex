import { chatsController } from '@/entities/chats';
import { Block } from '@/shared/lib/block';
import type { BlockProps } from '@/shared/lib/block';

import { closeModal } from '@/shared/lib/modal';
import { store } from '@/shared/store';

export class AddUserToChatModal extends Block<BlockProps> {
  static componentName = 'AddUserToChat';

  protected template = `
    {{#> Modal noPadding=true}}
      {{#> Form title="Добавить пользователя" buttonText="Добавить" error=error isModal=true }}
        {{{ Input type="text" placeholder="Логин" ref="login" name="login" label="Логин" id="login" className="form__fieldset" }}}
      {{/Form}}
    {{/Modal}}
  `;

  protected events = {
    submit: async (event: Event) => {
      event.preventDefault();

      const form = event.target as HTMLFormElement;

      const formData = new FormData(form);

      const login = formData.get('login');

      if (!login || typeof login !== 'string') {
        return;
      }
      const chatId = store.getState().chats.selectedChat?.id;

      if (!chatId) {
        return;
      }

      await chatsController.addUserToChat(login, chatId);

      closeModal();
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
