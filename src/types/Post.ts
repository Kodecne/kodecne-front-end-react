import { User } from "./User";
export interface Post {
    id: number;
    autor: User;
    texto: string;
    data: string;
    midias: PostMidia[];
}
export interface PostMidia {
    id: number;
    arquivo: string;
}