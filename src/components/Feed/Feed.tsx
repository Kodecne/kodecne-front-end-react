import { PostCard } from "./PostCard";
import { useState } from "react";
import { Post } from "./PostCard"; // importa o tipo correto daqui!
import style from "./Style-PostCard.module.css";

export function Feed() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      autor: {
        id: "101",
        nome: "Alice Silva",
        imagem: "https://i.pravatar.cc/150?img=1"
      },
      conteudo: "Olá, mundo! Meu primeiro post aqui! 😊 Olá, mundo! Meu primeiro post aqui! 😊 Olá, mundo! Meu primeiro post aqui! 😊 Olá, mundo! Meu primeiro post aqui! 😊 Olá, mundo! Meu primeiro post aqui! 😊 Olá, mundo! Meu primeiro post aqui! 😊",
      data: "5 minutos atrás"
    },
    {
      id: "2",
      autor: {
        id: "102",
        nome: "Carlos Lima",
        imagem: "https://i.pravatar.cc/150?img=2"
      },
      conteudo: "Olhem essa paisagem maravilhosa que vi hoje!",
      data: "1 hora atrás",
      imagem: "https://picsum.photos/400/200"
    }
  ]);

  return (
    <div className={style.feedContainer}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
