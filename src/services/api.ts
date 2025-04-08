import axios from "axios";

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

export default api;
