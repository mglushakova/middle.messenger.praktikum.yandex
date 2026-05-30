import { Block, type BlockProps } from '@/shared/lib/block';

import './chat-list.scss';

export class ChatList extends Block<BlockProps> {
  static componentName = 'ChatList';

  protected template = `
    <div class="chat-list">
      <a href="/settings" class="chat-list__link">
        Профиль
      </a>

      <input
        type="text"
        placeholder="Поиск"
        class="chat-list__search"
      />

      <ul class="chat-list__items">
        {{{ ChatItem
          name="Вадим"
          lastMessage="Привет"
          time="10:49"
        }}}

        {{{ ChatItem
          name="Киноклуб"
          lastMessage="Вы: стикер"
          time="12:00"
        }}}
      </ul>
    </div>
  `;
}
