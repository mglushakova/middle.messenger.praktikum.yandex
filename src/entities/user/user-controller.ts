import { authAPI } from '@/shared/api/auth';
import { getErrorMessage } from '@/shared/api/get-error';
import {
  userAPI,
  type ChangePasswordRequest,
  type UserRequest,
} from '@/shared/api/user';
import { store } from '@/shared/store';

export class UserController {
  async changeProfile(data: UserRequest) {
    try {
      await userAPI.changeProfile(data);

      const user = await authAPI.getUser();

      store.setState('user', user);
    } catch (error) {
      store.setState('profile.error', getErrorMessage(error));
    }
  }

  async changePassword(data: ChangePasswordRequest) {
    try {
      await userAPI.changePassword(data);
    } catch (error) {
      store.setState('profile.error', getErrorMessage(error));
    }
  }

  async changeAvatar(file: File) {
    const formData = new FormData();

    formData.append('avatar', file);

    try {
      const user = await userAPI.changeAvatar(formData);

      store.setState('user', user);
    } catch (error) {
      store.setState('profile.error', getErrorMessage(error));
    }
  }

  public setError(error: string) {
    store.setState('profile.error', error);
  }

  public clearError() {
    store.setState('profile.error', null);
  }
}

export const userController = new UserController();
