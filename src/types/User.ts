export interface User {
    id: number;
    name: string;
    email: string;
    bio?: string;  // o ? significa que o campo é opcional major
    imagem?: string;
    genero?: string;
}
