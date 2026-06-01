import type { User } from '@/entities/user';

export type RequestState = {
  error: string | null;
  isLoading: boolean;
};

export type AppState = {
  user: User | null;
  auth: RequestState;
  profile: RequestState;
};
