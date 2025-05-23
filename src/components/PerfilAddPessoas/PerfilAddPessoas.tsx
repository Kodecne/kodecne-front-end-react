import style from "./Style-PerfilAddPessoas.module.css"
import { PerfilPessoa } from "./PerfilPessoa"

const pessoasFake = [
  { id: '1', nome: 'Alice', imagem: 'https://i.pravatar.cc/150?img=1', descricao: 'Amante de café ☕' },
  { id: '2', nome: 'Bob', imagem: 'https://i.pravatar.cc/150?img=2', descricao: 'Gamer e desenvolvedor' },
  { id: '3', nome: 'Carol', imagem: 'https://i.pravatar.cc/150?img=3', descricao: 'Apaixonada por gatos  AAAAAAAAAAAAA ADWASD W AWDASD WA D' },
  { id: '4', nome: 'David', imagem: 'https://i.pravatar.cc/150?img=4' }, // sem descrição
  { id: '5', nome: 'Eve', imagem: 'https://i.pravatar.cc/150?img=5', descricao: 'Segurança digital 🔐' },
];

export function PerfilAddPessoas() {
    const handleSeguir = (id: string) => {
        console.log('Seguindo pessoa com id:', id);
    };

    return (
        <div className={style.leftPerfilAddPessoas}>
            <h2 className={style.textTitle}>Sugestões para você</h2>
            <div className={style.pessoasList}>
                {pessoasFake.map((pessoa) => (
                    <PerfilPessoa key={pessoa.id} pessoa={pessoa} onSeguir={handleSeguir} />
                ))}
            </div>
        </div>
    )
}
