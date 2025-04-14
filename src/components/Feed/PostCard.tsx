import { useState } from "react";
import style from "./Style-PostCard.module.css";
import { Post } from "../../types/Post";
import { FaRegThumbsUp, FaThumbsUp, FaRegComment, FaShare } from "react-icons/fa";
import {formatDistanceToNow, format} from "date-fns"
import {ptBR} from "date-fns/locale"

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  const [curtido, setCurtido] = useState(false);

  const dataPublicacao = new Date(post.data);
  const agora = new Date();
  const diferencaEmDias = Math.floor((agora.getTime() - dataPublicacao.getTime()) / (1000 * 60 * 60 * 24));
  console.log(diferencaEmDias)
  const tempoExibicao =
    diferencaEmDias < 7
      ? formatDistanceToNow(dataPublicacao, { addSuffix: true, locale: ptBR })
      : format(dataPublicacao, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR });

  
  const toggleCurtir = () => {
    setCurtido((prev) => !prev);
  };

  return (
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

      <p className={style.conteudo}>{post.texto}</p>

      {post.midias[0] && (
        <img
          src={post.midias[0].arquivo}
          alt="Imagem do post"
          className={style.imagemPost}
        />
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

        <button className={style.botaoAcao}>
          <FaRegComment className={style.icone} />
          Comentar
        </button>

        <button className={style.botaoAcao}>
          <FaShare className={style.icone} />
          Compartilhar
        </button>
      </div>
    </div>
  );
}
