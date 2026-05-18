import { UserModel } from '@/entities/user/model';

import type { LoginData } from '@/entities/user/types';

export class AuthController {
  private userModel = new UserModel();

  public login(data: LoginData) {
    console.log(data);
    this.userModel.login(data);
  }
}
