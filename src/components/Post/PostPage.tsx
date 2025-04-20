import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import style from './PostPage.module.css';
import { Post } from '../../types/Post';
import { getPost } from '../../services/postsService';

export function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [likes, setLikes] = useState(0);
    const [comentarios, setComentarios] = useState<string[]>([]);
    const [mostrarMidias, setMostrarMidias] = useState(true);
    const [novoComentario, setNovoComentario] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function obterDados() {
            if (!id) {
                navigate('/');
                return;
            }
            const post_data = await getPost(id);
            console.log(post_data)
            setPost(post_data);
            setLikes( 0); // Certifique-se de que o campo "likes" existe
            setComentarios([]);
        }
        obterDados();
    }, [id]);

    if (!post) return <div>Carregando...</div>;

    function curtirPost() {
        setLikes(prev => prev + 1);
        // Aqui você pode futuramente enviar para API
    }

    function enviarComentario() {
        if (!novoComentario.trim()) return;
        setComentarios(prev => [...prev, novoComentario.trim()]);
        setNovoComentario('');
        // Aqui também poderia salvar na API
    }

    return (
        <div className={style.postContainer}>
            <div className={style.cabecalho}>
                <img src={post.autor.imagem} alt={post.autor.name} className={style.fotoPerfil} />
                <div>
                    <strong>{post.autor.name}</strong>
                    <span className={style.data}>{new Date(post.data).toLocaleString()}</span>
                </div>
            </div>

            <p className={style.conteudo}>{post.texto}</p>

            {post.midias.length > 0 && (
                <div className={style.toggleMidias}>
                    <button onClick={() => setMostrarMidias(prev => !prev)}>
                        {mostrarMidias ? 'Ocultar mídias' : 'Mostrar mídias'}
                    </button>
                </div>
            )}
            {post.midias.length > 0 && mostrarMidias && (
                <div className={style.galeriaMidias}>
                    {post.midias.map((midia, index) => (
                        midia.tipo === "imagem" ? (
                            <img
                                key={index}
                                src={midia.arquivo}
                                alt={`Imagem ${index + 1}`}
                                className={style.imagemPost}
                            />
                        ) : (
                            <video key={index} controls className={style.imagemPost}>
                                <source src={midia.arquivo} type="video/mp4" />
                                Seu navegador não suporta vídeos.
                            </video>
                        )
                    ))}
                </div>
            )}

            {/* Botão de curtir */}
            <div className={style.interacoes}>
                <button onClick={curtirPost} className={style.botaoCurtir}>Curtir</button>
                <span>{likes} curtida{likes === 1 ? '' : 's'}</span>
            </div>

            {/* Comentários */}
            <div className={style.comentarios}>
                <h3>Comentários</h3>
                <ul>
                    {comentarios.map((comentario, index) => (
                        <li key={index}>{comentario}</li>
                    ))}
                </ul>

                <div className={style.formComentario}>
                    <input
                        type="text"
                        placeholder="Escreva um comentário..."
                        value={novoComentario}
                        onChange={e => setNovoComentario(e.target.value)}
                    />
                    <button onClick={enviarComentario}>Enviar</button>
                </div>
            </div>
        </div>
    );
}
