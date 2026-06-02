import { authAPI } from '@/shared/api/auth';
import { getErrorMessage } from '@/shared/api/get-error';
import { userAPI, type UserRequest } from '@/shared/api/user';
import { store } from '@/shared/store';

class ProfileEditController {
  async changeProfile(data: UserRequest) {
    try {
      await userAPI.changeProfile(data);

      const user = await authAPI.getUser();

      console.log('user', user);

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

const profileEditController = new ProfileEditController();

export default profileEditController;
