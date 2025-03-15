import style from './Style-LoginPage.module.css';
import kodecneTecnology from '../../assets/images/kodecne-tecnology-large.png'
import light from '../../assets/images/light.svg'


export function LoginPage() {
    return (
        <div className={style.container}>
            <div className={style.leftPart}>
                <img src={kodecneTecnology} alt="" />
            </div>
            <div className={style.rigtPart}>
                <div className={style.containerFormsColor}>
                    <img src={light} alt="" />
                    <div className={style.containerForms}>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}