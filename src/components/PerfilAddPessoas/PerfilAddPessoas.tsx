import style from "./Style-PerfilAddPessoas.module.css"
import { PerfilPessoa } from "./PerfilPessoa.tsx"

const pessoasFake = [
    { id: '1', nome: 'Alice', imagem: 'https://i.pravatar.cc/150?img=1' },
    { id: '2', nome: 'Bob', imagem: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', nome: 'Carol', imagem: 'https://i.pravatar.cc/150?img=3' },
    { id: '4', nome: 'David', imagem: 'https://i.pravatar.cc/150?img=4' },
    { id: '5', nome: 'Eve', imagem: 'https://i.pravatar.cc/150?img=5' },
    { id: '6', nome: 'Frank', imagem: 'https://i.pravatar.cc/150?img=6' },
    { id: '7', nome: 'Grace', imagem: 'https://i.pravatar.cc/150?img=7' },
    { id: '8', nome: 'Heidi', imagem: 'https://i.pravatar.cc/150?img=8' },
    { id: '9', nome: 'Ivan', imagem: 'https://i.pravatar.cc/150?img=9' },
    { id: '10', nome: 'Judy', imagem: 'https://i.pravatar.cc/150?img=10' },
  ];

export function PerfilAddPessoas() {
    const handleSeguir = (id: string) => {
        console.log('Seguindo pessoa com id:', id);
        // Aqui você pode chamar uma API pra seguir essa pessoa | Lan eu nao entendi essa parte então so copiei do gpeto, te amo
    };

    return (
        <>
            <div className={style.leftPerfilAddPessoas}>
                <h2 className={style.textTitle}>Pessoas que você talvez conheça</h2>
                <div className={style.pessoasList}>
                    {pessoasFake.map((pessoa) => (
                        <PerfilPessoa key={pessoa.id} pessoa={pessoa} onSeguir={handleSeguir} />
                    ))}
                </div>
            </div>
        </>
    )
}