import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Chat } from './Chat';
import api from '../../services/api';
import { User } from '../../types/User';

export function ChatPage() {
    const { userId } = useParams();
    const [otherUser, setOtherUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (userId) {
                const response = await api.get(`/users/profile/${userId}`);
                setOtherUser(response.data);
            } else {
                setOtherUser(null);
            }
        };
        fetchUser();
    }, [userId]);

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '2rem'
            }}>
                <Chat
                    otherUserId={userId ? Number(userId) : 0}
                    otherUser={otherUser}
                />
            </div>
        </div>
    );
}