import { User } from './User';

export interface ChatMessage {
    id: number;
    content: string;
    sender: User;
    receiver: User;
    timestamp: string;
    is_read: boolean;
}
export interface Conversation {
    user: User;
    lastMessage: ChatMessage;
    unreadCount?: number;
  }