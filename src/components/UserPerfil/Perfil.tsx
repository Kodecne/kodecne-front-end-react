import style from "./Style-UserPerfil.module.css"
import editPerfilBu from "../../assets/images/editar-perfil-button.png"
import seguirBu from "../../assets/images/seguir-button.png"
import enviarMensagemBu from "../../assets/images/enviar-mensagem-button.png"
import instagramLogo from "../../assets/images/insta-logo.png"
import githubLogo from "../../assets/images/github-logo.png"

type PerfilProps = {
    avatarUrl: string
    nome: string
    localidade: string
    descricao: string
    formacao: string
    instagram?: string
    github?: string
}

export function Perfil({avatarUrl, nome, localidade, descricao, formacao, instagram, github}: PerfilProps) {
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
                        <p>{formacao}</p>
                    </div>
                </div>

                <div className={style.buttonDinamic}>
                    <button className={style.oButton}>Editar Perfil<img src={editPerfilBu} alt="" /></button>
                    <button className={style.oButton}><img src={seguirBu} alt="" />Seguir</button>
                    <button className={style.oButton}><img src={enviarMensagemBu} alt="" />Enviar Mensagem</button>
                </div>

                <div className={style.descricaoPerfil}>
                    <p>{descricao}</p>
                </div>

                <div className={style.socialLinks}>
                    {instagram && (
                        <a href={instagram} target="_blank" rel="noreferrer"><img src={instagramLogo} alt="" />Instagram</a>
                    )}
                    {github && (
                        <a href={github} target="_blank" rel="noreferrer"><img src={githubLogo} alt="" />GitHub</a>
                    )}
                </div>
            </div>
        </div>
    )
}