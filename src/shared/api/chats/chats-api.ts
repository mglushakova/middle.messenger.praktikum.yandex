import { BaseAPI } from '../base-api';
import HTTPTransport from '../http-transport';
import type {
  GetChatsRequest,
  CreateChatRequest,
  DeleteChatByIdRequest,
  AddUsersToChatRequest,
  DeleteUsersFromChatRequest,
  GetChatUserRequest,
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

  getChatUser(data: GetChatUserRequest) {
    return this.http.post(`/token/${data.id}`, {
      data,
    });
  }
}

const chatsAPI = new ChatsAPI();

export default chatsAPI;
