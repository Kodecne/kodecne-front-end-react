import style from "./Style-UserPerfil.module.css"
import { PerfilAddPessoas } from "../PerfilAddPessoas/PerfilAddPessoas"
import { Perfil } from "./Perfil"

export function UserPerfil() {
    return (
        <>
            <div className={style.alignItems}>
                <Perfil
                    avatarUrl="https://avatars.githubusercontent.com/u/583231?v=4"
                    nome="Octocat Dev"
                    localidade="eu moro aqui boy"
                    descricao="🚀Estudante de Análise e Desenvolvimento de Sistemas buscando estágio para aplicar e expandir habilidades técnicas em desenvolvimento de software e contribuir para projetos inovadores."
                    formacao="Engenharia de Software - MIT"
                    instagram="https://instagram.com/octocat"
                    github="https://github.com/octocat"
                />
                <PerfilAddPessoas />
            </div>
            
        </>
    )
}