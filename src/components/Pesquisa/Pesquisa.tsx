import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../services/api";
import style from './Style-PesquisaPage.module.css';

export function Pesquisa() {
    const location = useLocation();
    const [results, setResults] = useState<any[]>([]);
    const [type, setType] = useState<string>("");
    const [query, setQuery] = useState<string>("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const queryParam = params.get("query") || "";
        const typeParam = params.get("type") || "user";
        setQuery(queryParam);
        setType(typeParam);

        if (queryParam.length > 1) {
            api.get("/buscar/search/", { params: { query: queryParam, type: typeParam } })
                .then(res => {
                    let arr: any[] = [];
                    if (typeParam === "user") arr = res.data.users || [];
                    else if (typeParam === "tecnologia") arr = res.data.tecnologias || [];
                    else if (typeParam === "post") arr = res.data.posts || [];
                    setResults(arr);
                })
                .catch(() => setResults([]));
        } else {
            setResults([]);
        }
    }, [location.search]);

    return (
        <div className={style.centralizarPesquisa}>
            <h2>Resultados para: <b>{query}</b> ({type})</h2>
            {results.length === 0 && <p>Nenhum resultado encontrado.</p>}
            <ul className={style.listaResultados}>
                {type === "user" && results.map((user: any) => (
                    <li key={user.id} className={style.itemResultado}>
                        <img src={user.imagem || user.image || ""} alt={user.name || user.username} width={40} style={{borderRadius: 20}} />
                        <span>{user.name || user.username} - {user.email}</span>
                    </li>
                ))}
                {type === "tecnologia" && results.map((tec: any) => (
                    <li key={tec.id} className={style.itemResultado}>
                        <span>{tec.nome}</span>
                    </li>
                ))}
                {type === "post" && results.map((post: any) => (
                    <li key={post.id} className={style.itemResultado}>
                        <span>{post.texto}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}