import type { Chat } from '@/entities/chats/types';
import type { ChatMessageType } from '@/entities/message';
import type { User } from '@/entities/user';

export type RequestState = {
  error: string | null;
  isLoading: boolean;
};

export type ModalState = {
  name: string | null;
  props?: Record<string, unknown>;
};

export type AppState = {
  user: User | null;
  auth: RequestState;
  profile: RequestState;
  chats: {
    items: Chat[];
    selectedChat: Chat | null;
    error: string | null;
    token: string | null;
    messages: ChatMessageType[];
    isLoading: boolean;
    isLoaded: boolean;
  };
  ui: {
    modal: ModalState;
  };
};
