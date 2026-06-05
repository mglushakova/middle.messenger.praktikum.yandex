import { Block } from '@/shared/lib/block';
import type { BlockProps } from '@/shared/lib/block';
import './chat-window.scss';
import type { Chat } from '@/entities/chats/types';
import { connect } from '@/shared/store';
import { openModal } from '@/shared/lib/modal';
import { chatsController } from '@/entities/chats';

interface ChatWindowProps extends BlockProps {
  chat: Chat;
  isMenuOpen: boolean;
}

const withSelectedChat = connect((state) => ({
  chat: state.chats.selectedChat,
}));

export class ChatWindowBase extends Block<ChatWindowProps> {
  static componentName = 'ChatWindow';

  constructor(props?: ChatWindowProps) {
    super({
      ...(props ?? {}),
      onAddUser: () => {
        openModal('addUserToChat', {
          chatId: props?.chat?.id,
        });
      },
      onRemoveUser: () => {
        openModal('removeUserFromChat', {
          chatId: props?.chat?.id,
        });
      },
      onDeleteChat: async () => {
        if (!props?.chat?.id) {
          return;
        }

        await chatsController.deleteChat(props.chat.id);
      },
    } as ChatWindowProps);
  }

  protected template = `
    <div class="chat-window">
      <header class="chat-window__header">
        <div class="chat-window__user">
          {{> ChatAvatar}}
          <div class="chat-window__title">{{ chat.title }}</div>
        </div>
        <button type="button" class="chat-window__menu-button">
          <svg
            width="3"
            height="15"
            viewBox="0 0 3 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="1.5" cy="1.5" r="1.5" fill="#1E1E1E" />
            <circle cx="1.5" cy="7.5" r="1.5" fill="#1E1E1E" />
            <circle cx="1.5" cy="13.5" r="1.5" fill="#1E1E1E" />
          </svg>
        </button>
        {{#if isMenuOpen}}
          {{{ ChatMenu
            onAddUser=onAddUser
            onRemoveUser=onRemoveUser
            onDeleteChat=onDeleteChat
          }}}
        {{/if}}
      </header>

      <div class="chat-window__messages"></div>

      <footer class="chat-window__footer">
        {{{ MessageInput }}}
      </footer>
    </div>
  `;

  protected events = {
    click: (event: Event) => {
      const target = event.target as HTMLElement;

      if (target.closest('.chat-window__menu-button')) {
        this.setProps({
          isMenuOpen: !this.props.isMenuOpen,
        });

        return;
      }
    },
  };
}

export const ChatWindow = withSelectedChat(ChatWindowBase);
