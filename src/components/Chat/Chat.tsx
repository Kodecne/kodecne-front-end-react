import { useState, useEffect, useRef } from 'react';
import { chatService } from '../../services/chatService';
import { ChatMessage } from '../../types/Chat';
import {User} from '../../types/User';
import style from './Chat.module.css';

interface ChatProps {
    otherUserId: number;
    otherUser: User;
}

export function Chat({ otherUserId, otherUser }: ChatProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Polling a cada 3 segundos
        const fetchMessages = async () => {
            const newMessages = await chatService.getMessages(otherUserId);
            setMessages(newMessages);
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);

        return () => clearInterval(interval);
    }, [otherUserId]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            const sentMessage = await chatService.sendMessage(otherUserId, newMessage);
            setMessages([...messages, sentMessage]);
            setNewMessage('');
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    };

    return (
        <div className={style.chatLayout}>
            <div className={style.conversasList}>
                <h2>Conversas</h2>
                <div className={style.searchContainer}>
                    <input type="text" placeholder="Pesquisar..." />
                </div>
                <div className={style.userList}>
                    {/* Lista de usuários */}
                </div>
            </div>

            <div className={style.chatContainer}>
                <div className={style.chatHeader}>
                    <div className={style.userInfo}>
                        <img src={otherUser.imagem} alt={otherUser.name} />
                        <h3>{otherUser.name}</h3>
                    </div>
                </div>

                <div className={style.messagesContainer}>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`${style.message} ${
                                message.sender.id === otherUserId ? style.received : style.sent
                            }`}
                        >
                            <p>{message.content}</p>
                            <span className={style.timestamp}>
                                {new Date(message.timestamp).toLocaleTimeString()}
                            </span>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className={style.messageForm}>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Digite sua mensagem..."
                    />
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </div>
    );
}