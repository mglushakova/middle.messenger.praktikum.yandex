import type { QueryData } from '@/shared/lib/query-stringify/query-stringify';

export interface UserRequest extends QueryData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface ChangePasswordRequest extends QueryData {
  oldPassword: string;
  newPassword: string;
}

export interface FindUserRequest extends QueryData {
  login: string;
}
