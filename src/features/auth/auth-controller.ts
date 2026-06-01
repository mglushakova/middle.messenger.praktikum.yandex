import { router } from '@/app/router';
import type { User } from '@/entities/user';
import {
  authAPI,
  type SignInRequest,
  type SignUpRequest,
} from '@/shared/api/auth';
import { getErrorMessage } from '@/shared/api/get-error';
import { store } from '@/shared/store';

class AuthController {
  async init() {
    try {
      const user = await authAPI.getUser();

      store.setState('user', user);
    } catch {
      store.setState('user', null);
    } finally {
      store.setState('auth.isInitialized', true);
    }
  }

  async signin(data: SignInRequest) {
    try {
      await authAPI.signin(data);

      const user = (await authAPI.getUser()) as User;

      store.setState('user', user);
      store.setState('auth.error', null);

      router.go('/messenger');
    } catch (error) {
      store.setState('authError', getErrorMessage(error));
    }
  }

  async signup(data: SignUpRequest) {
    try {
      await authAPI.signup(data);

      const user = (await authAPI.getUser()) as User;

      store.setState('user', user);
      store.setState('authError', null);

      router.go('/messenger');
    } catch (error) {
      store.setState('auth.error', getErrorMessage(error));
    }
  }

  async logout() {
    try {
      await authAPI.logout();

      store.setState('user', null);
      store.setState('auth.error', null);

      router.go('/');
    } catch (error) {
      store.setState('auth.error', getErrorMessage(error));
    }
  }

  public async fetchUser() {
    try {
      const user = (await authAPI.getUser()) as User;

      store.setState('user', user);
    } catch {
      store.setState('user', null);
    }
  }

  public setError(error: string) {
    store.setState('auth.error', error);
  }

  public clearError() {
    store.setState('auth.error', null);
  }
}

const authController = new AuthController();

export default authController;
