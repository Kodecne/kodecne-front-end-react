import { useEffect, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import style from './Style-Navbar.module.css';
import navLogo from '../../assets/images/logo kodecne.svg';
import home from '../../assets/images/home.svg';
import clip from "../../assets/images/clip.png";
import { Link, useNavigate } from "react-router-dom";
import feed from '../../assets/images/feed.svg';
import messages from '../../assets/images/messages.png';
import notification from '../../assets/images/notifications.svg';
import { User } from "../../types/User";
import { fetchMe } from "../../services/userService";
import api from "../../services/api";

export function Navbar() {
    const [query, setQuery] = useState("");
    const [_results, setResults] = useState<any[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [searchType] = useState("user"); // Tipo de pesquisa
    const [userData, setUserData] = useState<User|null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function obterUsuario() {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setUserData(null); // não está logado
                return;
            }
            const user = await fetchMe()
            setUserData(user)
        }
        obterUsuario()
    }, [])

    useEffect(() => {
        const fetchResults = async () => {
            if (query.length < 2) {
                setResults([]);
                setIsDropdownVisible(false);
                return;
            }

            try {
                const response = await api.get(`/buscar/search/`, {
                    params: { query, type: searchType },
                });
                setResults(response.data[searchType + "s"]); // Exemplo: "users", "tecnologias", "posts"
                setIsDropdownVisible(true);
            } catch (error) {
                console.error("Erro ao buscar resultados:", error);
            }
        };

        fetchResults();
    }, [query, searchType]);

    function handleLogout(){
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/auth')
    }

    // const handleNavigate = (type: string, id: string) => {
    //     if (type === "user") navigate(`/profile/${id}`);
    //     if (type === "tecnologia") navigate(`/tecnologia/${id}`);
    //     if (type === "post") navigate(`/post/${id}`);
    // };

    const handleMouseEnter = () => setIsDropdownVisible(true);
    const handleMouseLeave = () => setIsDropdownVisible(false);

    // const handleResultClick = (result: any) => {
    //     if (searchType === "user") {
    //         navigate(`/perfil/${result.id}`);
    //     } else if (searchType === "tecnologia") {
    //         navigate(`/tecnologias/${result.id}`);
    //     } else if (searchType === "post") {
    //         navigate(`/post/${result.id}`);
    //     }
    // };

    return (
    <header>
        <nav>
            <div className={style.leftItems}>
                <div className={style.navLogo}>
                    <Link to={"/"}>
                        <img src={navLogo} alt="Logo" />
                    </Link>
                </div>

                {userData && (
                  <div className={style.searchContainer}>
                    <span className={style.materialSymbolsOutlined}>search</span>
                    <input
                      type="text"
                      placeholder="Pesquisar..."
                      value={query}
                      onChange={e => {
                        setQuery(e.target.value);
                        setIsDropdownVisible(e.target.value.length > 0);
                      }}
                      onFocus={() => setIsDropdownVisible(query.length > 0)}
                      onBlur={() => setTimeout(() => setIsDropdownVisible(false), 150)}
                    />
                    {isDropdownVisible && query.length > 0 && (
                      <ul className={style.dropdown}>
                        <li
                          className={style.dropdownItem}
                          onMouseDown={() => navigate(`/pesquisa?query=${encodeURIComponent(query)}&type=user`)}
                        >
                          Pesquisar <b>{query}</b> Usuário
                        </li>
                        <li
                          className={style.dropdownItem}
                          onMouseDown={() => navigate(`/pesquisa?query=${encodeURIComponent(query)}&type=post`)}
                        >
                          Pesquisar <b>{query}</b> Post
                        </li>
                        <li
                          className={style.dropdownItem}
                          onMouseDown={() => navigate(`/pesquisa?query=${encodeURIComponent(query)}&type=tecnologia`)}
                        >
                          Pesquisar <b>{query}</b> Tecnologia
                        </li>
                      </ul>
                    )}
                  </div>
                )}
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
                    <Link to="/conexoes" className={style.item}>
                        <img src={clip} alt="Conexões" />
                        <p>Conexões</p>
                    </Link>
                    <Link to={"/chat"} className={style.item}>
                        <img src={messages} alt="Mensagens" />
                        <p>Mensagens</p>
                    </Link>
                    <Link to={"/notificacoes"} className={style.item} >
                        <img src={notification} alt="Notificações"/>
                        <p>Notificações</p>
                    </Link>
                </div>

                <div 
                    className={style.navbarProfile} 
                    onMouseEnter={handleMouseEnter} 
                    onMouseLeave={handleMouseLeave}
                >
                    {userData && (<Link to={"/perfil"}>
                        <button className={style.navbarAvatarButton}>
                            <img
                                src={userData.imagem}
                                alt="Avatar"
                                className={style.navbarAvatar}
                            />
                            <ChevronDownIcon className={style.navbarChevron} />
                        </button>
                    </Link>)}

                    {isDropdownVisible && (
                        <div className={style.navbarDropdown}>
                            <ul>
                                <li onClick={() => navigate('/settings')}>Configurações</li>
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
