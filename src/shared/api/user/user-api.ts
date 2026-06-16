import type { User } from '@/entities/user';
import { BaseAPI } from '../base-api';
import HTTPTransport from '../http-transport';
import type {
  UserRequest,
  ChangePasswordRequest,
  FindUserRequest,
} from './types';

class UserAPI extends BaseAPI {
  private http = new HTTPTransport('/user');

  changeProfile(data: UserRequest) {
    return this.http.put('/profile', {
      data,
    });
  }

  changeAvatar(data: FormData) {
    return this.http.put('/profile/avatar', {
      data,
    });
  }

  changePassword(data: ChangePasswordRequest) {
    return this.http.put('/password', {
      data,
    });
  }

  getUserByLogin(data: FindUserRequest): Promise<User[]> {
    return this.http.post('/search', {
      data,
    }) as Promise<User[]>;
  }
}

const userAPI = new UserAPI();

export default userAPI;
