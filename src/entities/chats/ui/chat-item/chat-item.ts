import { Block, type BlockProps } from '@/shared/lib/block';
import './chat-item.scss';

interface ChatItemProps extends BlockProps {
  name: string;
  lastMessage: string;
  time: string;
  unreadCount?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export class ChatItem extends Block<ChatItemProps> {
  static componentName = 'ChatItem';

  protected events = {
    click: () => {
      this.props.onClick?.();
    },
  };

  protected template = `
    <li class="chat-item {{#if isActive}}chat-item_active{{/if}}">
      <button type="button" class="chat-item__button">
        <div class="chat-item__avatar"></div>

        <div class="chat-item__content">
          <span class="chat-item__name">{{ name }}</span>
          <span class="chat-item__message">{{ lastMessage }}</span>
        </div>
        <div class="chat-item__info">
          <span class="chat-item__time">{{ time }}</span>
          {{#if unreadCount}}
          <span class="chat-item__unread-count">{{ unreadCount }}</span>
          {{/if}}
        </div>
      </button>
    </li>
  `;
}
