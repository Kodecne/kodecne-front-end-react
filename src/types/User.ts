export interface User {
    id: number;
    name: string;
    email: string;
    telefone?: string;
    bio?: string;  // o ? significa que o campo é opcional major
    imagem?: string;
    genero?: string;
    data_nascimento?: string;
    escolaridade?: string;
    localidade?: string
    linkedin?:string
    github?:string
}
export const mockUser = {
    id: 1,
    name: "Goku",
    email: "goku@teste.com",
    imagem: "https://th.bing.com/th/id/OIP.QHSi98dVjDtsDGj38XdLYQAAAA?rs=1&pid=ImgDetMain",
    bio: "Desenvolvedor Teste",
    genero: "Masculino"
};