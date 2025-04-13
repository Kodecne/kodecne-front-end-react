import { PostCard } from "./PostCard";
import { useState } from "react";
import { Post } from "../../types/Post"; // importa o tipo correto daqui!
import { useEffect } from "react";
import { User } from "../../types/User";
import { fetchMe } from "../../services/userService";
import style from "./Style-PostCard.module.css";
import { CriarPost } from "./CriarPost";
import { getPosts } from "../../services/postsService";

export function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const[userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    async function obterDados() {
      const user = await fetchMe()
      const posts = await getPosts()
      setUserData(user)
      setPosts(posts)
      console.log(posts);
      
    }
    obterDados()
  }, [])
  useEffect(()=>{
    console.log(userData)
  }, [userData])

  return (
    <div className={style.feedContainer}>
      <CriarPost/>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
