import TrendingPosts from "./TrendingPosts";
import style from "./Style-TrendingPosts.module.css"

const trending = [
    { id: "1", content: "A nova atualização mudou tudo!" },
    { id: "2", content: "5 dicas para manter sua conta segura" },
    { id: "3", content: "Essa história vai te surpreender..." },
    { id: "4", content: "Como economizar tempo no seu dia a dia" },
    { id: "5", content: "Você não vai acreditar no que aconteceu!" },
    { id: "6", content: "Veja o antes e depois dessa transformação" },
    { id: "7", content: "O truque simples que viralizou!" },
    { id: "8", content: "A verdade sobre esse novo recurso" },
    { id: "9", content: "Descubra como melhorar sua produtividade" },
    { id: "10", content: "Esse vídeo está dando o que falar" },
];

export default function Trending() {
    const handleNavigate = (id: string) => {
        console.log(`Ir para o post ${id}`);
        // Aqui você pode usar: navigate(`/post/${id}`) se estiver usando React Router
    };

    return (
        <div className={style.tamanho}>
            <TrendingPosts posts={trending} onNavigate={handleNavigate} />
        </div>
    );
}


