import style from './Style-Footer.module.css';
import exclamation from '../../assets/images/circle-exclamation-solid.svg'
import question from '../../assets/images/circle-question-solid.svg'
import gear from '../../assets/images/gear-solid.svg'
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer>
            <div className={style.leftItemsFooter}>
                <div className={style.footerItem}>
                    <img src={exclamation} alt="" />
                    <div className={style.textFooter}>
                        <h2>Sobre nós</h2>
                        <Link to={"/"}>Conheça nossa missão</Link> 
                    </div>
                </div>
                <div className={style.footerItem}>
                    <img src={question} alt="" />
                    <div className={style.textFooter}>
                        <h2>Dúvidas?</h2>
                        <Link to={"/"}>Acesse a nossa Central de Ajuda.</Link>
                    </div>
                </div>
                <div className={style.footerItem}>
                    <img src={gear} alt="" />
                    <div className={style.textFooter}>
                        <h2>Gerencie sua conta e privacidade</h2>
                        <Link to={"/"}>Acesse suas Configurações.</Link>
                    </div>
                </div>
            </div>

            <div className={style.rightItemsFooter}>

            </div>
        </footer>
    )
}