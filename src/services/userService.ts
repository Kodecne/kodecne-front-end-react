import api from "./api";
import { User } from "../types/User";

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
