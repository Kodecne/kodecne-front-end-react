import api from "./api";
import { ChatMessage } from "../types/Chat";

export const chatService = {
    async getMessages(userId: number): Promise<ChatMessage[]> {
        const response = await api.get(`/chat/messages/?user_id=${userId}`);
        return response.data;
    },

    async sendMessage(receiverId: number, content: string): Promise<ChatMessage> {
        const response = await api.post('/chat/messages/', {
            receiver_id: receiverId,
            content: content
        });
        return response.data;
    },

    async getUnreadCount(): Promise<number> {
        const response = await api.get('/chat/unread/');
        return response.data.unread_count;
    }
};