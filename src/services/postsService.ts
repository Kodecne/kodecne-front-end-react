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
                data: "2 segundos atrás",
            },
            {
                id: 1,
                autor: mockUser,
                texto: "Eu moro aqui boy",
                data: "2 minutos atrás",
            },
        ];
    }
}