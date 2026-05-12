import type { LoginData } from '../types';

export class UserModel {
  public login(data: LoginData) {
    console.log('LOGIN:', data);
  }
}
