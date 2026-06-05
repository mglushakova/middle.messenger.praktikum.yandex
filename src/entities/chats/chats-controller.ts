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

  async removeUserFromChat(login: string, chatId: number) {
    const users = await userAPI.getUserByLogin({ login });

    if (!users.length) {
      throw new Error('Пользователь не найден');
    }

    await chatsAPI.deleteUsersFromChat({
      users: [users[0].id],
      chatId,
    });
  }

  selectChat(chat: Chat) {
    store.setState('chats.selectedChat', chat);
  }
}

export const chatsController = new ChatsController();
