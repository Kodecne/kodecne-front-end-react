
import style from "./Style-UserPerfil.module.css"
import { fetchMe } from "../../services/userService"
import { PerfilAddPessoas } from "../PerfilAddPessoas/PerfilAddPessoas"
import { Perfil } from "./Perfil"
import { useEffect, useState } from "react"
import { mockUser, User } from "../../types/User"

export function UserPerfil() {
    const [userData, setUserData] = useState<User>(mockUser);
    useEffect(()=>{
        async function obterUsuario(){
            const user = await fetchMe()
            setUserData(user)
        }
        obterUsuario()
    }, [])
    useEffect(()=>{
        console.log(userData);
    }, [userData])
    return (
        <>
            <div className={style.alignItems}>
                {userData && <Perfil
                    avatarUrl={userData.imagem || "https://th.bing.com/th/id/OIP.QHSi98dVjDtsDGj38XdLYQAAAA?rs=1&pid=ImgDetMain"}
                    nome={userData.name}
                    localidade="eu moro aqui boy"
                    descricao={userData.bio||"🚀Estudante de Análise e Desenvolvimento de Sistemas buscando estágio para aplicar e expandir habilidades técnicas em desenvolvimento de software e contribuir para projetos inovadores."}
                    formacao="Engenharia de Software - MIT"
                    instagram="https://instagram.com/octocat"
                    github="https://github.com/octocat"
                />}
                <PerfilAddPessoas />
            </div>
            
        </>
    )
}