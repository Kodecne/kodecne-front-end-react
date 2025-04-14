import api from "./api";
import { mockUser, User } from "../types/User";

const SO_FRONT = false

// Função para buscar todos os usuários
export async function getUsers(): Promise<User[]> {
    try {
        const response = await api.get<User[]>("users/");
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        return []; // Retorna um array vazio em caso de erro
    }
}
export async function fetchMe(): Promise<User | null>{
    try{
        const response = await api.get<User>('users/me')
        return response.data
    }
    catch(error){
        console.log("Erro ao buscar dados do usuário:", error)
        return SO_FRONT ? mockUser : null
    }
}
export async function fetchPublicUser(id:string|number): Promise<User | null> {
    try {
        const response = await api.get<User>(`users/profile/${id}`)
        return response.data
    }
    catch (error) {
        console.log("Erro ao buscar dados do usuário:", error)
        return SO_FRONT ? mockUser : null
    }
}