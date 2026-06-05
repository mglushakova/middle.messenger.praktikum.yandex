import { Block, type BlockProps } from '@/shared/lib/block';
import './chat-list.scss';
import type { Chat } from '@/entities/chats/types';
import { connect } from '@/shared/store';
import { openModal } from '@/shared/lib/modal';

type ChatListProps = BlockProps & {
  chats: Chat[];
};

const withChats = connect((state) => ({
  chats: state.chats.items,
}));

export class ChatList extends Block<ChatListProps> {
  static componentName = 'ChatList';

  protected template = `
    <div class="chat-list">
      <div class="chat-list__top">
        <button type="button" class="chat-list__create-btn">Создать новый чат</button>
        <a href="/settings" class="chat-list__link">
          Профиль
        </a>
      </div>

      <input
        type="text"
        placeholder="Поиск"
        class="chat-list__search"
      />

      <ul class="chat-list__items">
        {{#each chats}}
          {{{ ChatItem
              chat=this
            }}}
        {{/each}}
      </ul>
    </div>
  `;

  protected events = {
    click: (event: Event) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('chat-list__create-btn')) {
        openModal('createChat');
      }
    },
  };
}

export const chatList = withChats(ChatList);
