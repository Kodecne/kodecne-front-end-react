import style from './Style-Footer.module.css';
import exclamation from '../../assets/images/circle-exclamation-solid.svg'
import question from '../../assets/images/circle-question-solid.svg'
import gear from '../../assets/images/gear-solid.svg'

export function Footer() {
    return (
        <footer>
            <div className={style.leftItemsFooter}>
                <div className={style.footerItem}>
                    <img src={exclamation} alt="" />
                    <div className={style.textFooter}>
                       <h2>Sobre nós</h2>
                        <a href="/">Conheça nossa missão</a> 
                    </div>
                </div>
                <div className={style.footerItem}>
                    <img src={question} alt="" />
                    <div className={style.textFooter}>
                        <h2>Dúvidas?</h2>
                        <a href="/">Acesse a nossa Central de Ajuda.</a>
                    </div>
                </div>
                <div className={style.footerItem}>
                    <img src={gear} alt="" />
                    <div className={style.textFooter}>
                        <h2>Gerencie sua conta e privacidade</h2>
                        <a href="/">Acesse suas Configurações.</a>
                    </div>
                </div>
            </div>

            <div className={style.rightItemsFooter}>
                <div className={style.KodecneCorporation}>
                    <p>Kodecne Corporation © 2025</p>
                </div>
            </div>
        </footer>
    )
}