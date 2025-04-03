import React, { useState } from 'react';
import style from './Style-LoginPageForm.module.css';

interface LoginPageFormProps {
    onLogin: (username: string, password: string) => void;
    onRegister: (username: string, password: string, confirmPassword: string) => void;
    onResetPassword: (username: string) => void;
    page?: boolean;
}

const LoginPageForm: React.FC<LoginPageFormProps> = ({ onLogin, onRegister, onResetPassword, page=false }) => {
    const [view, setView] = useState<'login' | 'register' | 'reset'>(page ? 'register' : 'login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const renderForm = () => {
        switch (view) {
            case 'login':
                return (
                    <div className={style.containerForm}>
                        <h2>LOGIN</h2>
                        <input type="text" placeholder="Nome de Usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <div>
                            <button className={style.buttonLink} onClick={() => setView('reset')}>Esqueci minha senha</button>
                            <div className={style.center}><p>Não tem conta? <button onClick={() => setView('register')}>Cadastre-se</button></p></div>
                            <div className={style.center}><button className={style.buttonM} onClick={() => onLogin(username, password)}>Logar</button></div>
                        </div>
                    </div>
                );

            case 'register':
                return (
                    <div className={style.containerForm}>
                        <h2>CADASTRAR</h2>
                        <input type="text" placeholder="Nome de Usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="password" placeholder="Confirmar Senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <p>Já tenho uma conta.<button onClick={() => setView('login')}>Entrar</button></p>
                        <button className={style.buttonM} onClick={() => onRegister(username, password, confirmPassword)}>Registrar</button>
                    </div>
                );

            case 'reset':
                return (
                    <div className={style.containerForm}>
                        <h2>RECUPERAR SENHA</h2>
                        <input type="text" placeholder="Nome de Usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <button className={style.buttonLink} onClick={() => setView('login')}>Voltar para o Login</button>
                        <button className={style.buttonM} onClick={() => onResetPassword(username)}>Redefinir Senha</button>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className={style.container}>
            {renderForm()}
        </div>
    );
};

export default LoginPageForm;
