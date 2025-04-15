import style from "./Style-TrendingPosts.module.css"

type Post = {
  id: string;
  content: string;
};

interface TrendingPostsProps {
  posts: Post[];
  onNavigate: (id: string) => void; // função que lida com a navegação
}

export default function TrendingPosts({ posts, onNavigate }: TrendingPostsProps) {
    return (
      <div className={style.container}>
        <h2 className={style.title}>🔥 Em alta</h2>
        <ul className={style.list}>
          {posts.map((post) => (
            <li key={post.id}>
              <button
                onClick={() => onNavigate(post.id)}
                className={style.link}
              >
                {post.content}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }