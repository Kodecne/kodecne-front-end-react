
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
                        avatarUrl={userData.imagem}
                        nome={userData.name}
                        localidade={userData.localidade}
                        bio={userData.bio}
                        escolaridade={userData.escolaridade}
                        linkedin={userData.linkedin}
                        github={userData.github}
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