import { useState, useEffect, useRef } from 'react';
import { chatService } from '../../services/chatService';
import { ChatMessage, Conversation } from '../../types/Chat';
import { User } from '../../types/User';
import style from './Chat.module.css';
import { Link } from 'react-router-dom';
import { errorToastHandler } from '../../services/api';

interface ChatProps {
    otherUserId: number;
    otherUser: User | null;
}

export function Chat({ otherUserId, otherUser }: ChatProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

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
        if (!newMessage.trim() && selectedImages.length === 0) return;

        try {
            const formData = new FormData();
            formData.append('receiver_id', otherUserId.toString());

            if (newMessage.trim()) {
                formData.append('content', newMessage.trim());
            }

            if (selectedImages.length > 0) {
                selectedImages.forEach((image) => {
                    formData.append('images', image);
                });
            }

            // Log para debug
            console.log('FormData contents:');
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            const sentMessage = await chatService.sendMessage(formData);
            setMessages(prev => [...prev, sentMessage]);
            setNewMessage('');
            setSelectedImages([]);
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            errorToastHandler(error);
        }
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setSelectedImages(prev => [...prev, ...filesArray]);
        }
    };

    const removeImage = (index: number) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
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
                                {message.content && <p>{message.content}</p>}
                                {message.images && message.images.length > 0 && (
                                    <div className={style.imageGallery}>
                                        {message.images.map((image, index) => (
                                            <img key={index} src={image} alt={`Imagem ${index + 1}`} />
                                        ))}
                                    </div>
                                )}
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
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            ref={fileInputRef}
                            onChange={handleImageSelect}
                            style={{ display: 'none' }}
                        />
                        <button type="button" onClick={() => fileInputRef.current?.click()} className={style.imageButton}>
                            <img src="/image-icon.svg" alt="Enviar imagens" />
                        </button>
                        <button type="submit">Enviar</button>
                    </form>
                    {selectedImages.length > 0 && (
                        <div className={style.selectedImages}>
                            {selectedImages.map((image, index) => (
                                <div key={index} className={style.imagePreview}>
                                    <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
                                    <button onClick={() => removeImage(index)}>×</button>
                                </div>
                            ))}
                        </div>
                    )}
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