import chatsAPI from '@/shared/api/chats/chats-api';
import type { GetChatsRequest } from '@/shared/api/chats/types';
import { store } from '@/shared/store';
import type { Chat } from './types';
import { closeModal } from '@/shared/lib/modal';

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
}

const chatsController = new ChatsController();

export default chatsController;
