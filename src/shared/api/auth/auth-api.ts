import { BaseAPI } from '../base-api';
import HTTPTransport from '../http-transport';
import type { SignInRequest, SignUpRequest } from './types';

export class AuthAPI extends BaseAPI {
  private http = new HTTPTransport('/auth');

  signup(data: SignUpRequest) {
    return this.http.post('/signup', {
      data,
    });
  }

  signin(data: SignInRequest) {
    return this.http.post('/signin', {
      data,
    });
  }

  getUser() {
    return this.http.get('/user');
  }

  logout() {
    return this.http.post('/logout');
  }
}
