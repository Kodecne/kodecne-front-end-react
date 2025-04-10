import { useEffect, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import style from './Style-Navbar.module.css';
import navLogo from '../../assets/images/logo kodecne.svg';
import home from '../../assets/images/home.svg';
import { Link } from "react-router-dom";
import feed from '../../assets/images/feed.svg';
import messages from '../../assets/images/messages.svg';
import notification from '../../assets/images/notifications.svg';
import code from '../../assets/images/code.svg';
import { useNavigate } from "react-router-dom";
import { mockUser, User } from "../../types/User";
import { fetchMe } from "../../services/userService";

export function Navbar() {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleMouseEnter = () => setIsDropdownVisible(true);
    const handleMouseLeave = () => setIsDropdownVisible(false);

    const navigate = useNavigate()
    
    function handleLogout(){
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login')
    }

    const[userData, setUserData] = useState<User>(mockUser);
    useEffect(() => {
        async function obterUsuario() {
            const user = await fetchMe()
            setUserData(user)
        }
        obterUsuario()
    }, [])
    useEffect(() => {
        console.log(userData);

    }, [userData])

    return (
    <header>
        <nav>
            <div className={style.leftItems}>
                    <div className={style.navLogo}>
                        <Link to={"/"}>
                            <img src={navLogo} alt="Logo" />
                        </Link>
                    </div>

                <div className={style.searchContainer}>
                    <span className={style.materialSymbolsOutlined}>search</span>
                    <input type="text" placeholder="Pesquisar..." />
                </div>
            </div>
            
            <div className={style.rightItems}>
                <div className={style.navItems}>
                    <Link to={"/"} className={style.item}>
                        <img src={home} alt="Home" />
                        <p>Início</p>
                    </Link>
                    <Link to={"/feed"} className={style.item}>
                        <img src={feed} alt="Feed" />
                        <p>Feed</p>
                    </Link>
                    <Link to={""} className={style.item}>
                        <img src={messages} alt="Mensagens" />
                        <p>Mensagens</p>
                    </Link>
                    <Link to={""} className={style.item} >
                        <img src={notification} alt="Notificações"/>
                        <p>Notificações</p>
                    </Link>
                    <Link to={""} className={style.item} >
                        <img src={code} alt="Code Together" />
                        <p>Code Together</p>
                    </Link>
                </div>

                <div 
                    className={style.navbarProfile} 
                    onMouseEnter={handleMouseEnter} 
                    onMouseLeave={handleMouseLeave}
                >
                    <Link to={"/perfil"}>
                        <button className={style.navbarAvatarButton}>
                            <img
                                src={userData.imagem}
                                alt="Avatar"
                                className={style.navbarAvatar}
                            />
                            <ChevronDownIcon className={style.navbarChevron} />
                        </button>
                    </Link>

                    {isDropdownVisible && (
                        <div className={style.navbarDropdown}>
                            <ul>
                                <li onClick={() => console.log("Configurações")}>Configurações</li>
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    </header>
    )
}
