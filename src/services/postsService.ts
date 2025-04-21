import api from "./api";
import { Post } from "../types/Post.ts";
import { mockUser } from "../types/User.ts";

export async function getPosts(): Promise<Post[]> {
    try {
        const response = await api.get<Post[]>("posts/");
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        return [
            {
                id: 1,
                autor: mockUser,
                texto: "E ainda se vier noites traiçoeiras...",
                data: "2025-04-05 15:12:30.042049",
                midias:[],
                curtidas:0,
                curtido_por_mim:false,
                comentarios:[]
            },
            {
                id: 2,
                autor: mockUser,
                texto: "Eu moro aqui boy",
                data: "2025-04-02 15:12:30.042049",
                midias:[],
                curtidas:0,
                curtido_por_mim:false,
                comentarios:[]
            },
            {
                id: 3,
                autor: mockUser,
                texto: "Olha essa vista maravilhosa!",
                data: "2025-04-10 18:45:00.000000",
                midias: [
                  {
                    id: 1,
                    tipo: "imagem",
                    arquivo: "https://tse3.mm.bing.net/th?id=OIP.d_dr2EXx39-6WOlT2RDN-gHaEo&pid=Api" // certifique-se que esse arquivo está na pasta `public/img/`
                  }
                ],
                curtidas:0,
                curtido_por_mim:false,
                comentarios:[]
            },
            {
                id: 4,
                autor: mockUser,
                texto: "Final de semana épico com essa galera! 🏞️🔥",
                data: "2025-04-13 20:10:00.000000",
                midias: [
                  {
                    id: 1,
                    tipo: "imagem",
                    arquivo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                  },
                  {
                    id: 2,
                    tipo: "video",
                    arquivo: "https://www.w3schools.com/html/mov_bbb.mp4"
                  },
                  {
                    id: 3,
                    tipo: "imagem",
                    arquivo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                  }
                ],
                curtidas:0,
                curtido_por_mim:false,
                comentarios:[]
              },
        ];
    }
}
export async function getPost(id:string): Promise<Post> {
  try {
    const response = await api.get<Post>(`posts/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return{
        id: 1,
        autor: mockUser,
        texto: "E ainda se vier noites traiçoeiras...",
        data: "2025-04-05 15:12:30.042049",
        midias: [],
        curtidas:0,
        curtido_por_mim:false,
        comentarios:[]
      }
    ;
  }
}
export async function curtirPost(id: string) {
  try {
    const res = await api.post(`posts/${id}/curtir/`);
    return res; // Aqui já vem o JSON automaticamente
  } catch (error) {
    throw new Error(`Erro: ${error}`);
  }
}