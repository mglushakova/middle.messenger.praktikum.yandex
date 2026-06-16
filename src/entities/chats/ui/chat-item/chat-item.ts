import { Block, type BlockProps } from '@/shared/lib/block/block';
import './chat-item.scss';
import type { Chat } from '../../types';
import { chatsController } from '../../chats-controller';

interface ChatItemProps extends BlockProps {
  chat: Chat;
  unreadCount?: string;
  isActive?: boolean;
}

export class ChatItem extends Block<ChatItemProps> {
  static componentName = 'ChatItem';

  protected template = `
    <li class="chat-item {{#if isActive}}chat-item_active{{/if}}">
      <button type="button" class="chat-item__button">
        {{> ChatAvatar src=chat.avatar}}

        <div class="chat-item__content">
          <span class="chat-item__name">{{ chat.title }}</span>
          <span class="chat-item__message">{{ chat.content }}</span>
        </div>
        <div class="chat-item__info">
          <span class="chat-item__time">{{ chat.time }}</span>
          {{#if unreadCount}}
          <span class="chat-item__unread-count">{{ chat.unread_count }}</span>
          {{/if}}
        </div>
      </button>
    </li>
  `;

  protected events = {
    click: () => {
      chatsController.selectChat(this.props.chat);
    },
  };
}
