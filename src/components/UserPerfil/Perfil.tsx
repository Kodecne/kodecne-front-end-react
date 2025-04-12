import style from "./Style-UserPerfil.module.css"
import editPerfilBu from "../../assets/images/editar-perfil-button.png"
import seguirBu from "../../assets/images/seguir-button.png"
import enviarMensagemBu from "../../assets/images/enviar-mensagem-button.png"
import linkedinLogo from "../../assets/images/linkedin-logo.png"
import githubLogo from "../../assets/images/github-logo.png"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"


type PerfilProps = {
    avatarUrl: string
    nome: string
    localidade?: string
    bio?: string
    escolaridade?: string
    linkedin?: string
    github?: string
}

export function Perfil({avatarUrl, nome, localidade, bio, escolaridade, linkedin, github}: PerfilProps) {
    const navigate = useNavigate()
    useEffect(()=>{
        
    })
    return (
        <div className={style.background}>
            <div className={style.topBackground}>
                <img src={avatarUrl} alt="Avatar" className={style.avatarImage} />
            </div>
            <div className={style.content}>
                <div className={style.infos}>
                    <div className={style.lestInfos}>
                        <h2 className={style.namePerfil}>{nome}</h2>
                        <p>{localidade}</p>
                    </div>
                    <div className={style.rigthInfos}>
                        <p>{escolaridade}</p>
                    </div>
                </div>

                <div className={style.buttonDinamic}>
                    <button className={style.oButton} onClick={()=>navigate('/settings')}>Editar Perfil<img src={editPerfilBu} alt="" /></button>
                    <button className={style.oButton}><img src={seguirBu} alt="" />Seguir</button>
                    <button className={style.oButton}><img src={enviarMensagemBu} alt="" />Enviar Mensagem</button>
                </div>

                <div className={style.descricaoPerfil}>
                    <p>{bio}</p>
                </div>

                <div className={style.socialLinks}>
                    {linkedin && (
                        <a href={linkedin} target="_blank" rel="noreferrer"><img src={linkedinLogo} alt="" />Linkedin</a>
                    )}
                    {github && (
                        <a href={github} target="_blank" rel="noreferrer"><img src={githubLogo} alt="" />GitHub</a>
                    )}
                </div>
            </div>
        </div>
    )
}