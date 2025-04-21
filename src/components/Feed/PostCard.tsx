// src/components/Feed/PostCard.tsx
import { useState } from "react";
import style from "./Style-PostCard.module.css";
import { Post } from "../../types/Post";
import { FaRegThumbsUp, FaThumbsUp, FaRegComment, FaShare } from "react-icons/fa";
import { formatDistanceToNow, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { PostModal } from "./PostModal"; // Importação correta do PostModal
import { useNavigate } from 'react-router-dom';
import { curtirPost } from '../../services/postsService';


type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  const [curtido, setCurtido] = useState(post.curtido_por_mim);
  const [curtidas, setCurtidas] = useState(post.curtidas);
  const [modalAberto, setModalAberto] = useState(false);
  const navigate = useNavigate()
  const irParaPost = () => {

    navigate(`/post/${post.id}`);
  };

  const dataPublicacao = new Date(post.data);
  const agora = new Date();
  const diferencaEmDias = Math.floor(
    (agora.getTime() - dataPublicacao.getTime()) / (1000 * 60 * 60 * 24)
  );

  const tempoExibicao =
    diferencaEmDias < 7
      ? formatDistanceToNow(dataPublicacao, { addSuffix: true, locale: ptBR })
      : format(dataPublicacao, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR });

  

  const toggleCurtir = () => {
    async function curtir() {
      if (!post) return;
      try {
        const response = await curtirPost(post.id.toString());
        console.log(response)
        console.log(response.data.likes);
        
        setCurtidas(response.data.likes);

        switch (response.status) {
          case 201:
            setCurtido(true)
            break;

          case 200:
            setCurtido(false)
            break

          default:
            break;
        }
      } catch (error) {
        console.error("Erro ao curtir:", error);
      }
    }
    curtir()
  };

  // Comentários fictícios (você pode trocar por post.comentarios depois)
  const comentariosFakes = [
    { id: "1", author: "João", content: "Muito bom esse post!" },
    { id: "2", author: "Maria", content: "Concordo totalmente 👏" },
    { id: "3", author: "Lucas", content: "Isso fez meu dia melhor." },
    { id: "4", author: "Ana", content: "Incrível, parabéns!" },
    { id: "5", author: "Carlos", content: "Compartilhando agora!" },
    { id: "6", author: "Brendinha", content: "miau miau" },
    { id: "7", author: "Rafael", content: "Sensacional!" },
    { id: "8", author: "Larissa", content: "Merece mais reconhecimento!" },
    { id: "9", author: "Pedro", content: "Muito interessante." },
    { id: "10", author: "guigui", content: "ZZZ" },
    { id: "11", author: "Renan", content: "Hahaha, adorei isso 😄" },
    { id: "12", author: "Beatriz", content: "Profundo e verdadeiro." },
    { id: "13", author: "Tiago", content: "Deveria viralizar!" },
    { id: "14", author: "Fernanda", content: "Real demais 😂" },
    { id: "15", author: "Eduardo", content: "Não poderia concordar mais!" },
  ];

  return (
    <>
      <div className={style.postCard}>
        <div className={style.cabecalho}>
          <img
            src={post.autor.imagem}
            alt={post.autor.name}
            className={style.fotoPerfil}
          />
          <div>
            <strong>{post.autor.name}</strong>
            <span className={style.data}>{tempoExibicao}</span>
          </div>
        </div>

        {/* Exibindo o conteúdo do post */}
        <p onClick={irParaPost} className={style.conteudo}>{post.texto}</p>

        {/* Verificando se o post possui mídias e exibindo a primeira imagem */}
        {post.midias.length > 0 && (
          post.midias[0].tipo === "imagem" ? (
            <img
              src={post.midias[0].arquivo}
              alt="Imagem do post"
              className={style.imagemPost}
              onClick={irParaPost}
            />
          ) : (
            <video
              controls
              className={style.imagemPost}
              onClick={irParaPost}
              onPlay={(e) => e.stopPropagation()} // Evita conflito com onClick do modal
            >
              <source src={post.midias[0].arquivo} type="video/mp4" />
              Seu navegador não suporta vídeos.
            </video>
          )
        )}

        <div className={style.acoesPost}>
          <button className={style.botaoAcao} onClick={toggleCurtir}>
            {curtido ? (
              <>
                <FaThumbsUp className={style.icone} />
                Curtido
              </>
            ) : (
              <>
                <FaRegThumbsUp className={style.icone} />
                Curtir
              </>
            )}
          </button>
          <span>{curtidas} curtida{curtidas === 1 ? '' : 's'}</span>

          {/* Abrindo o modal de comentários */}
          <button className={style.botaoAcao} onClick={irParaPost}>
            <FaRegComment className={style.icone} />
            Comentar
          </button>

          <button className={style.botaoAcao}>
            <FaShare className={style.icone} />
            Compartilhar
          </button>
        </div>
      </div>

      {/* Modal para mostrar o post completo com comentários */}
      <PostModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        media={post.midias}  // Passando as mídias do post
        comments={comentariosFakes} // Comentários fictícios
        content={post.texto} // Texto do post
      />
    </>
  );
}
