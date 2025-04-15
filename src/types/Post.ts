import { User } from "./User";

export interface PostMidia {
  id: number;
  arquivo: string;
  tipo: "imagem" | "video";
}

export interface Post {
  id: number;
  autor: User;
  texto: string;
  data: string;
  midias: PostMidia[];
}
