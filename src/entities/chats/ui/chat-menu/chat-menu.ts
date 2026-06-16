import { Block, type BlockProps } from '@/shared/lib/block/block';
import './chat-menu.scss';

interface ChatMenuProps extends BlockProps {
  onAddUser: () => void;
  onRemoveUser: () => void;
  onDeleteChat: () => void;
}

export class ChatMenu extends Block<ChatMenuProps> {
  static componentName = 'ChatMenu';

  protected template = `
    <div class="chat-menu">
      <button
        type="button"
        class="chat-menu__button chat-menu__add-user"
      >
        <svg class="chat-menu__icon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="10.25" stroke="#3369F3" stroke-width="1.5"/>
          <line x1="10.9999" y1="5.5" x2="10.9999" y2="16.5" stroke="#3369F3" stroke-width="1.5"/>
          <line x1="5.49988" y1="11" x2="16.4999" y2="11" stroke="#3369F3" stroke-width="1.5"/>
        </svg>
        Добавить пользователя
      </button>

      <button
        type="button"
        class="chat-menu__button chat-menu__remove-user"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="10.25" stroke="#3369F3" stroke-width="1.5"/>
          <line x1="7.11077" y1="7.11091" x2="14.8889" y2="14.8891" stroke="#3369F3" stroke-width="1.5"/>
          <line x1="7.11077" y1="14.8891" x2="14.8889" y2="7.11091" stroke="#3369F3" stroke-width="1.5"/>
        </svg>
        Удалить пользователя
      </button>

      <button
        type="button"
        class="chat-menu__button chat-menu__remove-chat"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="10.25" stroke="#3369F3" stroke-width="1.5"/>
          <line x1="7.11077" y1="7.11091" x2="14.8889" y2="14.8891" stroke="#3369F3" stroke-width="1.5"/>
          <line x1="7.11077" y1="14.8891" x2="14.8889" y2="7.11091" stroke="#3369F3" stroke-width="1.5"/>
        </svg>
        Удалить чат
      </button>
    </div>
  `;

  protected events = {
    click: (event: Event) => {
      const target = event.target as HTMLElement;

      if (target.closest('.chat-menu__add-user')) {
        this.props.onAddUser();
      }

      if (target.closest('.chat-menu__remove-user')) {
        this.props.onRemoveUser();
      }

      if (target.closest('.chat-menu__remove-chat')) {
        this.props.onDeleteChat();
      }
    },
  };
}
