import './Style-Footer.css';
import exclamation from '../../assets/images/circle-exclamation-solid.svg'
import question from '../../assets/images/circle-question-solid.svg'
import gear from '../../assets/images/gear-solid.svg'

export function Footer() {
    return (
        <footer>
            <div className='left-items'>
                <div className='footer-item'>
                    <img src={exclamation} alt="" />
                    <div className='text-footer'>
                        <h2>Sobre nós</h2>
                        <a href="/">Conheça nossa missão</a> 
                    </div>
                </div>
                <div className='footer-item'>
                    <img src={question} alt="" />
                    <div className='text-footer'>
                        <h2>Dúvidas?</h2>
                        <a href="/">Acesse a nossa Central de Ajuda.</a>
                    </div>
                </div>
                <div className='footer-item'>
                    <img src={gear} alt="" />
                    <div className='text-footer'>
                        <h2>Gerencie sua conta e privacidade</h2>
                        <a href="/">Acesse suas Configurações.</a>
                    </div>
                </div>
            </div>

            <div className='right-items'>

            </div>
        </footer>
    )
}