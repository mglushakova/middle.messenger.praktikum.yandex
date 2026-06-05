import { chatsController } from '@/entities/chats';
import { Block } from '@/shared/lib/block';
import type { BlockProps } from '@/shared/lib/block';
import { closeModal } from '@/shared/lib/modal';
import { store } from '@/shared/store';
import './remove-user-from-chat-modal.scss';

export class RemoveUserFromChatModal extends Block<BlockProps> {
  static componentName = 'RemoveUserFromChat';

  constructor(props?: BlockProps) {
    super(props ?? {});
  }

  protected template = `
    {{#> Modal noPadding=true}}
      <section class="remove-user-from-chat-modal">
        <h3 class="remove-user-from-chat-modal__title">Удалить пользователя</h3>
        <ul class="remove-user-from-chat-modal__users-list">
          {{#each users}}
            <li class="remove-user-from-chat-modal__users-list-item">
              <span>{{this.login}}</span>

              <button
                type="button"
                data-id="{{this.id}}"
                class="button remove-user-from-chat-modal__button"
              >
                Удалить
              </button>
            </li>
          {{/each}}
        </ul>
      </section>
    {{/Modal}}
  `;

  protected events = {
    click: async (event: Event) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('remove-user-from-chat-modal__button')) {
        const userId = Number(target.dataset.id);
        const chatId = store.getState().chats.selectedChat?.id;

        if (!chatId) return;

        await chatsController.removeUserFromChat(userId, chatId);

        closeModal();
      }

      if (
        target.classList.contains('modal__close') ||
        target.classList.contains('modal')
      ) {
        closeModal();
      }
    },
  };
}
