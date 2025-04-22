import pessoas from '../../assets/images/pessoas.png'
import style from './Contatos.module.css'

export function Contatos() {
    return(
        <>
        <div className={style.pessoas}>
            <img  src={pessoas} alt="" />
        </div>
        </>
    );
}