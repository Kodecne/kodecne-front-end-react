import { useState, useEffect, useRef } from 'react';
import { chatService } from '../../services/chatService';
import { ChatMessage, Conversation } from '../../types/Chat';
import { User } from '../../types/User';
import style from './Chat.module.css';
import { Link } from 'react-router-dom';

interface ChatProps {
    otherUserId: number;
    otherUser: User | null;
}

export function Chat({ otherUserId, otherUser }: ChatProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Função para buscar tanto mensagens quanto conversas
    const fetchData = async () => {
        try {
            // Se tiver um usuário selecionado, busca as mensagens
            if (otherUserId) {
                const newMessages = await chatService.getMessages(otherUserId);
                setMessages(newMessages);
            }
            // Sempre atualiza a lista de conversas
            const userConversations = await chatService.getConversations();
            setConversations(userConversations);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    // Polling para atualizar mensagens e conversas
    useEffect(() => {
        fetchData(); // Busca inicial
        const interval = setInterval(fetchData, 3000); // Atualiza a cada 3 segundos

        return () => clearInterval(interval);
    }, [otherUserId]);

    // Effect para marcar mensagens como lidas
    useEffect(() => {
        if (otherUserId) {
            const updateUnreadStatus = async () => {
                try {
                    await chatService.markMessagesAsRead(otherUserId);
                    // Atualiza as conversas após marcar como lido
                    const updatedConversations = await chatService.getConversations();
                    setConversations(updatedConversations);
                } catch (error) {
                    console.error('Erro ao marcar mensagens como lidas:', error);
                }
            };

            updateUnreadStatus();
        }
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
                    {conversations.map((conversation) => (
                        <Link to={`/chat/${conversation.user.id}`} key={conversation.user.id} className={style.userItem}>
                            <img
                                src={conversation.user.imagem}
                                alt={conversation.user.name}
                                className={style.userAvatar}
                            />
                            <div className={style.userItemInfo}>
                                <h4>{conversation.user.name}</h4>
                                <p>{conversation.last_message?.content || 'Nenhuma mensagem'}</p>
                            </div>
                            {conversation.unread_count ? (
                                <span className={style.unreadBadge}>
                                    {conversation.unread_count}
                                </span>
                            ) : null}
                        </Link>
                    ))}
                </div>
            </div>

            {otherUser ? (
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
                                className={`${style.message} ${message.sender.id === otherUserId ? style.received : style.sent
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
            ) : (
                <div className={`${style.chatContainer} ${style.emptyChat}`}>
                    <div className={style.emptyChatMessage}>
                        <h3>Escolha alguém para conversar!</h3>
                    </div>
                </div>
            )}
        </div>
    );
}