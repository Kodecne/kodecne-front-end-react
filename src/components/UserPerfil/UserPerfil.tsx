
import style from "./Style-UserPerfil.module.css"
import { fetchMe } from "../../services/userService"
import { PerfilAddPessoas } from "../PerfilAddPessoas/PerfilAddPessoas"
import { Perfil } from "./Perfil"
import { useEffect, useState } from "react"
import { User } from "../../types/User"
import { useNavigate } from "react-router-dom"

export function UserPerfil() {
    const [userData, setUserData] = useState<User|null>(null);
    const navigate = useNavigate()
    useEffect(()=>{
        async function obterUsuario(){
            const user = await fetchMe()
            if (user == null){
                navigate('/login')
            }
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