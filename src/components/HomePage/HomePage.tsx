import style from './Style-HomePage.module.css';
import cadastrese from '../../assets/images/cadastrese.png'
import pc from '../../assets/images/pc.png'

export function HomePage() {
    return (
        <>
            <div className={style.HomePage01}>
                <div className={style.leftPart}><img src={cadastrese} alt="" /></div>
                <div className={style.rightPart}>
                    <div className={style.entrar}>
                        <a href="">CADASTRAR</a>
                        <a href="">ENTRAR</a>
                    </div>
                    <p>O <span className={style.kodecneColor}>Kodecne</span> é o espaço perfeito para desenvolvedores de todos os níveis se conectarem, compartilharem conhecimento e crescerem juntos. Aqui, você encontra um ambiente interativo feito por devs, para devs, onde pode discutir tecnologias, postar seus projetos, tirar dúvidas e se inspirar com a comunidade.</p>
                </div>
            </div>

            <div className={style.HomePage02}>
                <img src={pc} alt="" />
                <p><span className={style.buscandoProficionais}>Buscando profissionais qualificados para seu time tech?</span><br></br> O Kodecne conecta empresas a desenvolvedores<br></br> talentosos de forma rápida e eficiente.<br></br>💜 <span className={style.crieSeuPerfil}>Crie seu perfil agora e encontre seu próximo desenvolvedor!</span></p>
            </div>
        </>
    )
}