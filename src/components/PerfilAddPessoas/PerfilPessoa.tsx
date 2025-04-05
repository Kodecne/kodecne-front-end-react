import style from "./Style-PerfilAddPessoas.module.css"
import seguirBu from "../../assets/images/seguir-button.png"

type Pessoa = {
    id: string;
    nome: string;
    imagem: string;
};

type PerfilPessoaProps = {
    pessoa: Pessoa;
    onSeguir: (id: string) => void;
};

export function PerfilPessoa({ pessoa, onSeguir }: PerfilPessoaProps) {
    return (
        <>
            <div className={style.pessoaCard}>
                <div className={style.infoPessoa}>
                    <img src={pessoa.imagem} alt={pessoa.nome} className={style.fotoPerfil} />
                    <span className={style.nomePessoa}>{pessoa.nome}</span>
                </div>
                <button className={style.botaoSeguir} onClick={() => onSeguir(pessoa.id)}>
                    <img src={seguirBu} alt="" />Seguir
                </button>
            </div>
        </>
    )
}