import api, {errorToastHandler} from '../../services/api';
import style from './Style-LoginPage.module.css';
import kodecneTecnology from '../../assets/images/kodecne-tecnology-large.png'
import light from '../../assets/images/light.svg'
import LoginPageForm from '../LoginPageForm/LoginPageForm';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function LoginPage() {
    const navigate = useNavigate()

    const handleLogin = async (email: string, password: string) => {
        console.log('Login:', email, password);
        try {
            const response = await api.post('/users/login/', {
                email: email,
                password: password,
            });
            console.log(response.data)
            const { access, refresh } = response.data;

            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);
            toast.success('Logado com sucesso!')
            navigate('/perfil')
        } catch (error) {
            console.error(error);
            errorToastHandler(error)
        }
    };

    const handleRegister = async (username: string, email: string, password: string, confirmPassword: string) => {
        console.log('Register:', username, email, password, confirmPassword);
        if (password !== confirmPassword) {
            toast.warning("As senhas não coincidem!");
            return;
        }

        try {
            await api.post('/users/register/', {
                email: email,
                name: username,
                password: password,
            });

            toast.warning("Verifique seu e-mail para confirmar seu registro.")
        } catch (error) {
            console.error(error);
            errorToastHandler(error)
        }
    };

    const handleResetPassword = (username: string) => {
        console.log('Reset Password:', username);
    };

    return (
        <div className={style.container}>
            <div className={style.leftPart}>
                <Link to={'/'}>
                    <img src={kodecneTecnology} alt="" />
                </Link>
            </div>
            <div className={style.rigtPart}>
                <div className={style.containerFormsColor}>
                    <img src={light} alt="" />
                    <div className={style.containerForms}>
                        <LoginPageForm onLogin={handleLogin} onRegister={handleRegister} onResetPassword={handleResetPassword} />
                    </div>
                </div>
            </div>
        </div>
    );
}