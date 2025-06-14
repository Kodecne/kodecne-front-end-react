import axios from "axios";
import { toast } from "react-toastify";

export const baseURL = "http://127.0.0.1:8000/"

const api = axios.create({
    baseURL: baseURL,  // url padrao da api
});

// Interceptor que adiciona o token JWT nas requisições automaticamente
api.interceptors.request.use(
    (config) => {
        // Busca o token no localStorage
        const token = localStorage.getItem("accessToken");

        // Se o token existir, adiciona no cabeçalho da requisição
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Retorna a configuração da requisição modificada
        return config;
    },
    (error) => {
        // Caso haja erro ao configurar a requisição, ele é lançado aqui
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => response,
    error => {
        const status = error.response?.status;

        // Evita redirecionamento se já está na página de login
        const currentPath = window.location.pathname;
        const isOnLoginPage = currentPath.includes("/auth");

        if ((status === 401 || status === 403) && !isOnLoginPage) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            toast.error("Sessão expirada. Faça login novamente.");

            window.location.href = "/auth";
        }

        return Promise.reject(error);
    }
);
// Função para exibir toasts de erro
export function errorToastHandler(error: any) {
    if (error.response && error.response.data) {
        const data = error.response.data;
        if (typeof data === 'object') {
            const mensagens = Object.entries(data)
                .map(([campo, msgs]) => `${campo}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
                .join('\n');
            toast.error(mensagens);
        } else if (typeof data === 'string') {
            toast.error(data);
        } else {
            toast.error("Erro ao atualizar. Tente novamente.");
        }
    } else {
        toast.error("Erro inesperado. Verifique sua conexão.");
    }
}


export default api;
