
import style from "./Style-UserPerfil.module.css"
import { fetchMe } from "../../services/userService"
import { PerfilAddPessoas } from "../PerfilAddPessoas/PerfilAddPessoas"
import { Perfil } from "./Perfil"
import { useEffect, useState } from "react"
import { User } from "../../types/User"
import { useNavigate, useLocation } from "react-router-dom"
import { Post } from "../../types/Post"
import api from "../../services/api"
import { PostCard } from "../Feed/PostCard"
import { fetchPublicUser } from "../../services/userService"

export function UserPerfil() {
    const [userData, setUserData] = useState<User|null>(null);
    const [posts, setPosts] = useState<Post[]>([])
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(()=>{
        async function obterDados(){
            const queryParams = new URLSearchParams(location.search)
            const user_id = queryParams.get('user_id')
            let user
            if(user_id === null){
                user = await fetchMe()
                if(user === null){
                    navigate('/login')
                    return
                }
            }else{
                user = await fetchPublicUser(user_id)
            }
            setUserData(user)
            if(user){
                const response = await api.get<Post[]>(`/posts/?user_id=${user.id}`)
                setPosts(response.data)
            }
        }
        obterDados()
    }, [])
    useEffect(()=>{
        console.log(userData);
    }, [userData])
    return (
        <>
            <div className={style.alignItems}>
                {userData && <div>
                    <Perfil
                        avatarUrl={userData.imagem || "https://th.bing.com/th/id/OIP.QHSi98dVjDtsDGj38XdLYQAAAA?rs=1&pid=ImgDetMain"}
                        nome={userData.name}
                        localidade={userData.localidade||"Xique-Xique, Bahia"}
                        bio={userData.bio||"🚀Estudante de Análise e Desenvolvimento de Sistemas buscando estágio para aplicar e expandir habilidades técnicas em desenvolvimento de software e contribuir para projetos inovadores."}
                        escolaridade={userData.escolaridade||"Unibra"}
                        linkedin={userData.linkedin||"https://www.linkedin.com/in/goku-ultra-instinct-son-68805b304/"}
                        github={userData.github||"https://github.com/octocat"}
                    />
                    {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                </div>}
                <PerfilAddPessoas />
            </div>
            
        </>
    )
}