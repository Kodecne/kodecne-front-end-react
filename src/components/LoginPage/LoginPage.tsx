import style from './Style-LoginPage.module.css';
import kodecneTecnology from '../../assets/images/kodecne-tecnology-large.png'
import light from '../../assets/images/light.svg'
import LoginPageForm from '../LoginPageForm/LoginPageForm';

const handleLogin = (username: string, password: string) => {
    console.log('Login:', username, password);
  };

  const handleRegister = (username: string, password: string, confirmPassword: string) => {
    console.log('Register:', username, password, confirmPassword);
  };

  const handleResetPassword = (username: string) => {
    console.log('Reset Password:', username);
  };

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
                        <LoginPageForm onLogin={handleLogin} onRegister={handleRegister} onResetPassword={handleResetPassword}  page={false}/>
                    </div>
                </div>
            </div>
        </div>
    );
}