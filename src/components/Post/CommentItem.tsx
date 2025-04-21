// src/components/CommentItem.tsx
import style from './CommentItem.module.css';
import { User } from '../../types/User';

interface CommentItemProps {
    usuario: User;
    texto: string;
    data: string;
}

export function CommentItem({ usuario, texto, data }: CommentItemProps) {
    return (
        <div className={style.comentario}>
            <img
                src={usuario.imagem || '/default-avatar.png'}
                alt={usuario.name}
                className={style.avatar}
            />
            <div className={style.corpo}>
                <div className={style.topo}>
                    <strong>{usuario.name}</strong>
                    <span>{new Date(data).toLocaleString()}</span>
                </div>
                <p>{texto}</p>
            </div>
        </div>
    );
}
