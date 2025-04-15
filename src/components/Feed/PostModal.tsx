// src/components/Feed/PostModal.tsx
import React, { useEffect, useState } from "react";
import { PostMidia } from "../../types/Post";
import style from "./Style-PostModal.module.css";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";

type Comment = {
  id: string;
  author: string;
  content: string;
};

type PostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  media: PostMidia[]; 
  comments: Comment[];
  content: string;
};

export const PostModal: React.FC<PostModalProps> = ({
  isOpen,
  onClose,
  media,
  comments,
  content,
}) => {
  const [curtido, setCurtido] = useState(false);
  const [comentarios, setComentarios] = useState<Comment[]>(comments);
  const [novoComentario, setNovoComentario] = useState("");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const modal = document.getElementById("post-modal");
      if (modal && !modal.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const toggleCurtir = () => {
    setCurtido((prev) => !prev);
  };

  const handleEnviarComentario = () => {
    if (novoComentario.trim() === "") return;
    const novo: Comment = {
      id: String(Date.now()),
      author: "Você",
      content: novoComentario.trim(),
    };
    setComentarios((prev) => [...prev, novo]);
    setNovoComentario("");
  };

  if (!isOpen) return null;

  return (
    <div className={style.overlay}>
      <div id="post-modal" className={style.modal}>
        {/* Botão de fechar */}
        <button className={style.closeBtn} onClick={onClose}>X</button>

        {/* Mídias */}
        <div className={style.mediaSection}>
          {media.map((item, idx) =>
            item.tipo === "imagem" ? (
              <img key={idx} src={item.arquivo} alt={`media-${idx}`} className={style.mediaItem} />
            ) : (
              <video key={idx} controls className={style.mediaItem}>
                <source src={item.arquivo} type="video/mp4" />
                Seu navegador não suporta vídeos.
              </video>
            )
          )}
        </div>

        {/* Conteúdo do post */}
        <div className={style.textSection}>
          <p>{content}</p>
        </div>

        {/* Linha divisória logo abaixo do conteúdo */}
        <hr className={style.divider} />

        {/* Botão de like movido para logo abaixo do post */}
        <div className={style.likeSection}>
          <button onClick={toggleCurtir} className={style.likeBtn}>
            {curtido ? <FaThumbsUp /> : <FaRegThumbsUp />}
            {curtido ? " Curtido" : " Curtir"}
          </button>
        </div>

        {/* Campo para novo comentário */}
        <div className={style.newCommentSection}>
          <textarea
            placeholder="Escreva um comentário..."
            value={novoComentario}
            onChange={(e) => setNovoComentario(e.target.value)}
            className={style.textarea}
          />
          <button onClick={handleEnviarComentario} className={style.sendCommentBtn}>
            Comentar
          </button>
        </div>

        {/* Comentários existentes */}
        <div className={style.commentsSection}>
          <h3>Comentários</h3>
          {comentarios.length === 0 ? (
            <p>Sem comentários ainda.</p>
          ) : (
            <ul>
              {comentarios.map(comment => (
                <li key={comment.id}>
                  <strong>{comment.author}</strong>: {comment.content}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
