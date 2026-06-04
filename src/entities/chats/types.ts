import type { User } from '../user';

export interface Message {
  user: User;
}

export interface Chat {
  id: string;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: Message;
  time: string;
  content: string;
}
