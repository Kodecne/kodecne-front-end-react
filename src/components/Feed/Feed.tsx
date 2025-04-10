import { PostCard } from "./PostCard";
import { useState } from "react";
import { Post } from "./PostCard"; // importa o tipo correto daqui!
import { useEffect } from "react";
import { User } from "../../types/User";
import { fetchMe } from "../../services/userService";
import style from "./Style-PostCard.module.css";

export function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);

  const[userData, setUserData] = useState<User | null>(null);
  useEffect(() => {
    async function obterUsuario() {
      const user = await fetchMe()
      setUserData(user)
      setPosts([
        {
          id: "3",
          autor: {
            id: "45",
            nome: "Padre Marcelo Rossi",
            imagem: "https://curtamais.com.br/uploads/conteudos/a4501b789f129ecc9019b694c8cd8436.jpg"
          },
          conteudo: "E ainda se vier noites traiçoeiras...",
          data: "2 segundos atrás",
          imagem: "https://th.bing.com/th/id/OIP.dKFkRP4Pl27FXtBovZ9AdAAAAA?rs=1&pid=ImgDetMain"
        },
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
      ])
    }
    obterUsuario()
  }, [])
  useEffect(() => {
    console.log(userData);

  }, [userData])

  return (
    <div className={style.feedContainer}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
