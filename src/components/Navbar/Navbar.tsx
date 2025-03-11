import './Style-Navbar.css'
import navLogo from '../../assets/images/logo kodecne.svg'
import home from '../../assets/images/home.svg'
import feed from '../../assets/images/feed.svg'
import messages from '../../assets/images/messages.svg'
import notification from '../../assets/images/notifications.svg'
import code from '../../assets/images/code.svg'


export function Navbar() {
    return (
      <header>
        <nav>
            <div className="nav-logo">
                <img src={navLogo} alt="" />
            </div>

            <div className="search-container">
                <span className="material-symbols-outlined">search</span>
                <input type="text" placeholder="Pesquisar..." />
            </div>
            <div className='nav-items'>
                <a className='item' href="/">
                    <img src={home} alt="" />
                    <p>Início</p>
                </a>
                <a className='item' href="/">
                    <img src={feed} alt="" />
                    <p>Feed</p>
                </a>
                <a className='item' href="/">
                    <img src={messages} alt="" />
                    <p>Mensagens</p>
                </a>
                <a className='item' href="/">
                    <img src={notification} alt="" />
                    <p>Notificações</p>
                </a>
                <a className='item' href="/">
                    <img src={code} alt="" />
                    <p>Code Together</p>
                </a>
            </div>
        </nav>
      </header>
    )
}
