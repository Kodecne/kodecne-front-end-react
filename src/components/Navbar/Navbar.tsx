import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import './Style-Navbar.css';
import navLogo from '../../assets/images/logo kodecne.svg';
import home from '../../assets/images/home.svg';
import feed from '../../assets/images/feed.svg';
import messages from '../../assets/images/messages.svg';
import notification from '../../assets/images/notifications.svg';
import code from '../../assets/images/code.svg';
import defaultAvatar from '../../assets/images/default-avatar.webp'

// Usuário fictício (simulação)
const user = {
    profileImage: null // Troque para uma URL válida se desejar testar com uma imagem real
};

export function Navbar() {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleMouseEnter = () => setIsDropdownVisible(true);
    const handleMouseLeave = () => setIsDropdownVisible(false);

    return (
      <header>
        <nav>
            <div className="left-items">
                <div className="nav-logo">
                    <img src={navLogo} alt="Logo" />
                </div>

                <div className="search-container">
                    <span className="material-symbols-outlined">search</span>
                    <input type="text" placeholder="Pesquisar..." />
                </div>
            </div>
            
            <div className="right-items">
                <div className='nav-items'>
                    <a className='item' href="/">
                        <img src={home} alt="Home" />
                        <p>Início</p>
                    </a>
                    <a className='item' href="/">
                        <img src={feed} alt="Feed" />
                        <p>Feed</p>
                    </a>
                    <a className='item' href="/">
                        <img src={messages} alt="Mensagens" />
                        <p>Mensagens</p>
                    </a>
                    <a className='item' href="/">
                        <img src={notification} alt="Notificações" />
                        <p>Notificações</p>
                    </a>
                    <a className='item' href="/">
                        <img src={code} alt="Code Together" />
                        <p>Code Together</p>
                    </a>
                </div>

                <div 
                    className="navbar-profile" 
                    onMouseEnter={handleMouseEnter} 
                    onMouseLeave={handleMouseLeave}
                >
                    <button className="navbar-avatar-button">
                        <img
                            src={user?.profileImage || defaultAvatar}
                            alt="Avatar"
                            className="navbar-avatar"
                        />
                        <ChevronDownIcon className="navbar-chevron" />
                    </button>

                    {isDropdownVisible && (
                        <div className="navbar-dropdown">
                            <ul>
                                <li onClick={() => console.log("Configurações")}>Configurações</li>
                                <li onClick={() => console.log("Editar Perfil")}>Editar Perfil</li>
                                <li onClick={() => console.log("Logout")}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
      </header>
    )
}
