import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import style from './PostPage.module.css';
import { Comentario, Post } from '../../types/Post';
import { getPost } from '../../services/postsService';
import { CommentItem } from './CommentItem';
import api from '../../services/api';

export function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [likes, setLikes] = useState(0);
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
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
            setLikes(0); // Certifique-se de que o campo "likes" existe
            if(post){
                setComentarios(post.comentarios);
            }
        }
        obterDados();
    }, [id]);

    if (!post) return <div>Carregando...</div>;

    function curtirPost() {
        setLikes(prev => prev + 1);
        // Aqui você pode futuramente enviar para API
    }

    async function APIenviarComentario(texto: string) {
        const response = await api.post(`/posts/${id}/comentarios/`, { post:id, texto:novoComentario });
        console.log(response);
        
        return response.data;
    }
    async function handleEnviarComentario() {
        if (!novoComentario.trim() || !id) return;
        try {
            const novo = await APIenviarComentario(novoComentario.trim());
            setComentarios(prev => [novo, ...prev]);
            setNovoComentario('');
        } catch (error) {
            console.error("Erro ao enviar comentário:", error);
        }
    }

    return (
        <div className={style.postContainer}>
            <div className={style.cabecalho}>
                <img src={post.autor.imagem} alt={post.autor.name} className={style.fotoPerfil} />
                <div className={style.autorInfo}>
                    <span className={style.autorNome}>{post.autor.name}</span>
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
                <button onClick={curtirPost} className={style.botaoAcao}>Curtir</button>
                <span className={style.likesInfo}>{likes} curtida{likes === 1 ? '' : 's'}</span>
            </div>
            <form
                className={style.formComentario}
                onSubmit={(e) => {
                    e.preventDefault();
                    handleEnviarComentario();
                }}
            >
                <input
                    type="text"
                    placeholder="Escreva um comentário..."
                    value={novoComentario}
                    onChange={(e) => setNovoComentario(e.target.value)}
                    aria-label="Campo para digitar um comentário"
                />
                <button
                    type="submit"
                    disabled={!novoComentario.trim()}
                    className={style.botaoAcao} // Adicionada a classe .botaoAcao
                >
                    Enviar
                </button>
            </form>
            {/* Comentários */}
            <div className={style.comentarios}>
                {post.comentarios.length > 0 ? (
                    post.comentarios.map((comentario) => (
                        <CommentItem
                            key={comentario.id}
                            usuario={comentario.usuario}
                            texto={comentario.texto}
                            data={comentario.data}
                        />
                    ))
                ) : (
                    <p className={style.semComentarios}>Seja o primeiro a comentar!</p> // Adicionada a classe .semComentarios
                )}
            </div>
        </div>
    );
}
