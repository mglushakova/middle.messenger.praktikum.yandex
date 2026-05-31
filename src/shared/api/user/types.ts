import type { QueryData } from '@/shared/lib/query-stringify/query-stringify';

export interface SignInRequest extends QueryData {
  login: string;
  password: string;
}
