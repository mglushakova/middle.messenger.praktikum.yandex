import type { User } from '@/entities/user';
import { BaseAPI } from '../base-api';
import HTTPTransport from '../http-transport';
import type {
  GetChatsRequest,
  CreateChatRequest,
  DeleteChatByIdRequest,
  AddUsersToChatRequest,
  DeleteUsersFromChatRequest,
} from './types';

class ChatsAPI extends BaseAPI {
  private http = new HTTPTransport('/chats');

  getChats(data: GetChatsRequest) {
    return this.http.get('/', {
      data,
    });
  }

  createChat(data: CreateChatRequest) {
    return this.http.post('/', {
      data,
    });
  }

  deleteChat(data: DeleteChatByIdRequest) {
    return this.http.delete('/', {
      data,
    });
  }

  addUsersToChat(data: AddUsersToChatRequest) {
    return this.http.put('/users', {
      data,
    });
  }

  deleteUsersFromChat(data: DeleteUsersFromChatRequest) {
    return this.http.delete('/users', {
      data,
    });
  }

  getChatUsers(chatId: number) {
    return this.http.get<User[]>(`/${chatId}/users`);
  }

  getChatToken(chatId: number) {
    return this.http.post<{ token: string }>(`/token/${chatId}`);
  }
}

const chatsAPI = new ChatsAPI();

export default chatsAPI;
