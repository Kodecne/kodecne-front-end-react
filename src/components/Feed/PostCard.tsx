import { useState } from "react";
import style from "./Style-PostCard.module.css";
import { FaRegThumbsUp, FaThumbsUp, FaRegComment, FaShare } from "react-icons/fa";

export type Pessoa = {
  id: string;
  nome: string;
  imagem: string;
};

export type Post = {
  id: string;
  autor: Pessoa;
  conteudo: string;
  data: string;
  imagem?: string;
};

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  const [curtido, setCurtido] = useState(false);

  const toggleCurtir = () => {
    setCurtido((prev) => !prev);
  };

  return (
    <div className={style.postCard}>
      <div className={style.cabecalho}>
        <img
          src={post.autor.imagem}
          alt={post.autor.nome}
          className={style.fotoPerfil}
        />
        <div>
          <strong>{post.autor.nome}</strong>
          <span className={style.data}>{post.data}</span>
        </div>
      </div>

      <p className={style.conteudo}>{post.conteudo}</p>

      {post.imagem && (
        <img
          src={post.imagem}
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
