import { AuthAPI } from './auth-api';

const authAPI = new AuthAPI();

export { authAPI };
export type { SignInRequest, SignUpRequest } from './types';
