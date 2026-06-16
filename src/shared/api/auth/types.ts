import type { QueryData } from '@/shared/lib/query-stringify/query-stringify';

export interface SignInRequest extends QueryData {
  login: string;
  password: string;
}

export interface SignUpRequest extends QueryData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}
