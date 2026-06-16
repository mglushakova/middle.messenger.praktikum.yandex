import chatsAPI from '@/shared/api/chats/chats-api';
import type { GetChatsRequest } from '@/shared/api/chats/types';
import { store } from '@/shared/store';
import type { Chat } from './types';
import { closeModal } from '@/shared/lib/modal';
import { userAPI } from '@/shared/api/user';
import { chatSocket } from './api/chat-socket';
import { WS_URL } from '@/shared/config/api';

export class ChatsController {
  private isLoadingOldMessages = false;
  private hasMoreMessages = true;

  async getChats(data?: GetChatsRequest) {
    try {
      store.setState('chats.isLoading', true);

      const chats = (await chatsAPI.getChats(
        data ?? {
          offset: 0,
          limit: 20,
          title: '',
        },
      )) as Chat[];

      store.setState('chats.items', chats);
      store.setState('chats.error', null);
      store.setState('chats.isLoaded', true);
    } catch {
      store.setState('chats.error', 'Не удалось загрузить чаты');
    } finally {
      store.setState('chats.isLoading', false);
    }
  }

  async createChat(title: string) {
    try {
      await chatsAPI.createChat({ title });

      await this.getChats();

      closeModal();
    } catch (error) {
      console.error(error);
    }
  }

  async deleteChat(chatId: number) {
    try {
      await chatsAPI.deleteChat({ chatId });

      await this.getChats();

      store.setState('chats.selectedChat', null);
    } catch {
      store.setState('chats.error', 'Не удалось удалить чат');
    }
  }

  async addUserToChat(login: string, chatId: number) {
    const users = await userAPI.getUserByLogin({ login });

    if (!users.length) {
      throw new Error('Пользователь не найден');
    }

    await chatsAPI.addUsersToChat({
      users: [users[0].id],
      chatId,
    });
  }

  async removeUserFromChat(userId: number, chatId: number) {
    await chatsAPI.deleteUsersFromChat({
      users: [userId],
      chatId,
    });
  }

  async getChatUsers(chatId: number) {
    try {
      const users = await chatsAPI.getChatUsers(chatId);
      return users;
    } catch {
      store.setState('chats.error', 'Не удалось загрузить пользователей');
      return [];
    }
  }

  async getChatToken(chatId: number): Promise<string | null> {
    try {
      const response = await chatsAPI.getChatToken(chatId);

      store.setState('chats.token', response.token);

      return response.token;
    } catch {
      store.setState(
        'chats.error',
        'Не удалось получить токен для подключения к чату',
      );

      return null;
    }
  }

  selectChat(chat: Chat) {
    store.setState('chats.selectedChat', chat);

    void this.connectToChat(chat.id);
  }

  async connectToChat(chatId: number) {
    store.setState('chats.messages', []);
    const token = await this.getChatToken(chatId);

    if (!token) {
      return;
    }

    const userId = store?.getState()?.user?.id;

    if (!userId) {
      return;
    }

    chatSocket.onOpen(() => {
      chatSocket.getOldMessages();
    });

    chatSocket.onMessage((data) => {
      if (Array.isArray(data)) {
        if (data.length === 0) {
          this.hasMoreMessages = false;
          return;
        }

        const currentMessages = store.getState().chats.messages ?? [];

        store.setState('chats.messages', [
          ...data.reverse(),
          ...currentMessages,
        ]);

        return;
      }

      if (
        data.type !== 'message' &&
        data.type !== 'file' &&
        data.type !== 'sticker'
      ) {
        return;
      }

      const currentMessages = store.getState().chats.messages ?? [];

      store.setState('chats.messages', [...currentMessages, data]);
    });

    chatSocket.connect(`${WS_URL}/${userId}/${chatId}/${token}`);
  }

  async changeChatAvatar(chatId: number, file: File) {
    const data = new FormData();

    data.append('avatar', file);
    data.append('chatId', String(chatId));

    await chatsAPI.changeChatAvatar(data);

    await this.getChats();

    const selectedChat = store
      .getState()
      .chats.items.find((chat) => chat.id === chatId);

    if (selectedChat) {
      store.setState('chats.selectedChat', selectedChat);
    }
  }

  async loadOlderMessages() {
    if (!this.hasMoreMessages) return;
    const messages = store.getState().chats.messages ?? [];

    if (!messages.length || this.isLoadingOldMessages) {
      return;
    }

    const oldestMessage = messages[0];

    this.isLoadingOldMessages = true;

    chatSocket.getOldMessages(Number(oldestMessage.id));
  }
}

export const chatsController = new ChatsController();
