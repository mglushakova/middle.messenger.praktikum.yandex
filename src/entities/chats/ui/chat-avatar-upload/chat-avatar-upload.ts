import { Block, type BlockProps } from '@/shared/lib/block';
import { chatsController } from '@/entities/chats';
import { connect } from '@/shared/store';
import './chat-avatar-upload.scss';
import { RESOURCES_URL } from '@/shared/config/api';

type ChatAvatarUploadProps = BlockProps & {
  chatId: number;
  avatarUrl: string | null;
};

const withChatData = connect((state) => ({
  avatarUrl: state.chats.selectedChat?.avatar
    ? `${RESOURCES_URL}${state.chats.selectedChat.avatar}`
    : null,
}));

class ChatAvatarUploadBase extends Block<ChatAvatarUploadProps> {
  static componentName = 'ChatAvatarUpload';

  protected template = `
    <form class="chat-avatar">
      <label class="chat-avatar__label">

        {{#if avatarUrl}}
          <img
            src="{{avatarUrl}}"
            alt="Chat avatar"
            class="chat-avatar__image"
          />
        {{else}}
          <div class="chat-avatar__placeholder"></div>
        {{/if}}

        <span class="chat-avatar__copy">
          Изменить аватар
        </span>

        <input
          type="file"
          accept="image/*"
          hidden
        />
      </label>
    </form>
  `;

  protected events = {
    change: async (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];

      if (!file) {
        return;
      }

      await chatsController.changeChatAvatar(this.props.chatId, file);
    },
  };
}

export const ChatAvatarUpload = withChatData(ChatAvatarUploadBase);
