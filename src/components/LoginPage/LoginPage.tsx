import api from '../../services/api';
import style from './Style-LoginPage.module.css';
import kodecneTecnology from '../../assets/images/kodecne-tecnology-large.png'
import light from '../../assets/images/light.svg'
import LoginPageForm from '../LoginPageForm/LoginPageForm';

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

        alert("Login realizado com sucesso!");
        // redirecionar o usuário ou carregar dados aqui se quiser
    } catch (error) {
        console.error(error);
        alert("Erro ao fazer login. Verifique suas credenciais.");
    }
};

const handleRegister = async (username: string, email:string, password: string, confirmPassword: string) => {
    console.log('Register:', username, email, password, confirmPassword);
    if (password !== confirmPassword) {
        alert("As senhas não coincidem!");
        return;
    }

    try {
        await api.post('users/register/', {
            email: email,
            name: username,
            password: password,
        });

        alert("Cadastro realizado com sucesso! Agora é só logar.");
        // Se quiser: mude a view pra login após cadastro
        window.location.reload(); // ou alguma navegação controlada
    } catch (error) {
        console.error(error);
        alert("Erro ao registrar. Verifique os dados.");
    }
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
                        <LoginPageForm onLogin={handleLogin} onRegister={handleRegister} onResetPassword={handleResetPassword} page={false} />
                    </div>
                </div>
            </div>
        </div>
    );
}