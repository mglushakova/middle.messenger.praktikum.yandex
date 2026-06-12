import type { QueryData } from '@/shared/lib/query-stringify/query-stringify';

export interface GetChatsRequest extends QueryData {
  offset: number;
  limit: number;
  title: string;
}

export interface CreateChatRequest {
  title: string;
}

export interface DeleteChatByIdRequest {
  chatId: number;
}

export interface AddUsersToChatRequest {
  users: number[];
  chatId: number;
}

export interface DeleteUsersFromChatRequest {
  users: number[];
  chatId: number;
}

export interface GetChatUsersRequest {
  chatId: number;
}
