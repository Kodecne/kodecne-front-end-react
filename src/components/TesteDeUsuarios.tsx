import { useEffect, useState } from "react";
import { getUsers } from "../services/userService"; // Importa a função modularizada
import { User } from "../types/User"; // Importa o tipo User

export function Usuarios() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        async function fetchUsers() {
            const data = await getUsers(); // Usa a função reutilizável
            console.log(data);
            
            setUsers(data);
        }
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Usuarios ai</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        Nome: {user.name} <br />
                        Bio: {user.bio} <br />
                        Email: {user.email} <br />
                        Gênero: {user.genero} <br />
                        <img src={user.imagem} width="200" />
                    </li>
                ))}
            </ul>
        </div>
    )
}