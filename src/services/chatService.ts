import api, { errorToastHandler } from "./api";
import { ChatMessage, Conversation } from "../types/Chat";

export const chatService = {
    async getMessages(userId: number): Promise<ChatMessage[]> {
        const response = await api.get(`/chat/messages/?user_id=${userId}`);
        return response.data;
    },

    async sendMessage(formData: FormData): Promise<ChatMessage> {
        try {
            const response = await api.post('/chat/messages/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            errorToastHandler(error);
            throw error;
        }
    },

    async getUnreadCount(): Promise<number> {
        const response = await api.get('/chat/unread/');
        return response.data.unread_count;
    },

    async getConversations(): Promise<Conversation[]> {
        const response = await api.get('/chat/conversations');

        return response.data;
    },

    async markMessagesAsRead(userId: number): Promise<void> {
        await api.post(`/chat/messages/read/`, {
            sender_id: userId
        });
    },
};