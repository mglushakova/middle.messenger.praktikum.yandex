import chatsAPI from '@/shared/api/chats/chats-api';
import type { GetChatsRequest } from '@/shared/api/chats/types';
import { store } from '@/shared/store';
import type { Chat } from './types';
import { closeModal } from '@/shared/lib/modal';
import { userAPI } from '@/shared/api/user';

export class ChatsController {
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

  selectChat(chat: Chat) {
    store.setState('chats.selectedChat', chat);
  }
}

export const chatsController = new ChatsController();
