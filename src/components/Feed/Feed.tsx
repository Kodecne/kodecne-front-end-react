import { PostCard } from "./PostCard";
import { useState } from "react";
import { Post } from "../../types/Post"; // importa o tipo correto daqui!
import { useEffect } from "react";
import { User } from "../../types/User";
import { fetchMe } from "../../services/userService";
import style from "./Style-PostCard.module.css";
import { CriarPost } from "./CriarPost";
import { getPosts } from "../../services/postsService";
import { useSearchParams } from "react-router-dom";

export function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [_, setUserData] = useState<User | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const feedType: "foryou" | "trending" = !searchParams.get("type")
    ? "foryou"
    : (searchParams.get("type") as "foryou" | "trending");

  useEffect(() => {
    async function obterDados() {
      const user = await fetchMe();
      const posts = await getPosts();
      setUserData(user);
      setPosts(
        feedType === "trending"
          ? [...posts].sort((a, b) => b.curtidas - a.curtidas)
          : [...posts].sort(() => Math.random() - 0.5)
      );
      console.log(
        "ForYou Posts:",
        [...posts].sort(() => Math.random() - 0.5)
      );
      console.log(
        "Trending Posts:",
        [...posts].sort((a, b) => b.curtidas - a.curtidas)
      );
    }
    obterDados();
  }, [feedType]);

  return (
    <div className={style.feedContainer}>
      <section className={style.feedHeader}>
        <button
          onClick={() => setSearchParams({ type: "foryou" })}
          disabled={feedType === "foryou"}
        >
          Para você
        </button>
        <button
          onClick={() => setSearchParams({ type: "trending" })}
          disabled={feedType === "trending"}
        >
          Em alta
        </button>
      </section>
      <CriarPost />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
