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
                        <input type="text" placeholder="Nome de Usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <div>
                            <p>Não tem conta? <button onClick={() => setView('register')}>Cadastre-se</button></p>
                            <button onClick={() => setView('reset')}>Esqueci minha senha</button>
                            <button onClick={() => onLogin(username, password)}>Logar</button>
                        </div>
                    </div>
                );

            case 'register':
                return (
                    <div className={style.containerForm}>
                        <input type="text" placeholder="Nome de Usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="password" placeholder="Confirmar Senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <p>Já tenho uma conta.<button onClick={() => setView('login')}>Entrar</button></p>
                        <button onClick={() => onRegister(username, password, confirmPassword)}>Registrar</button>
                    </div>
                );

            case 'reset':
                return (
                    <div className={style.containerForm}>
                        <input type="text" placeholder="Nome de Usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <button onClick={() => onResetPassword(username)}>Redefinir Senha</button>
                        <button onClick={() => setView('login')}>Voltar para o Login</button>
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
