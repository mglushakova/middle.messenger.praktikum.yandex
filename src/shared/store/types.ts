import type { User } from '@/entities/user';

export type AppState = {
  user: User | null;
  auth: {
    error: string | null;
    isLoading?: boolean;
  };
};
