import React, { useState } from "react";
import style from "./Style-LoginPageForm.module.css";
import { useSearchParams } from "react-router";

interface LoginPageFormProps {
  onLogin: (email: string, password: string) => void;
  onRegister: (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => void;
  onResetPassword: (username: string) => void;
  // page?: boolean;
}

const LoginPageForm: React.FC<LoginPageFormProps> = ({
  onLogin,
  onRegister,
  onResetPassword,
}) => {
  // const [view, setView] = useState<'login' | 'register' | 'reset'>(page ? 'register' : 'login');
  const [searchParams, setSearchParams] = useSearchParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  console.log(searchParams.get("action"));

  const renderForm = () => {
    switch (searchParams.get("action")) {
      case "login":
        return (
          <div className={style.containerForm}>
            <h2>LOGIN</h2>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
              <button
                className={style.buttonLink}
                onClick={() => setSearchParams({ action: "reset" })}
              >
                Esqueci minha senha
              </button>
              <div className={style.center}>
                <p>
                  Não tem conta?{" "}
                  <button
                    onClick={() => setSearchParams({ action: "register" })}
                  >
                    Cadastre-se
                  </button>
                </p>
              </div>
              <div className={style.center}>
                <button
                  className={style.buttonM}
                  onClick={() => onLogin(email, password)}
                >
                  Logar
                </button>
              </div>
            </div>
          </div>
        );

      case "register":
        return (
          <div className={style.containerForm}>
            <h2>CADASTRAR</h2>
            <input
              type="text"
              placeholder="Nome de Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirmar Senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <p>
              Já tenho uma conta.
              <button onClick={() => setSearchParams({ action: "login" })}>
                Entrar
              </button>
            </p>
            <button
              className={style.buttonM}
              onClick={() =>
                onRegister(username, email, password, confirmPassword)
              }
            >
              Registrar
            </button>
          </div>
        );

      case "reset":
        return (
          <div className={style.containerForm}>
            <h2>RECUPERAR SENHA</h2>
            <input
              type="text"
              placeholder="Nome de Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              className={style.buttonLink}
              onClick={() => setSearchParams({ action: "login" })}
            >
              Voltar para o Login
            </button>
            <button
              className={style.buttonM}
              onClick={() => onResetPassword(username)}
            >
              Redefinir Senha
            </button>
          </div>
        );

      default:
        console.log(searchParams.getAll("action"));
        // Substituir a linha problemática
        window.location.href = `/auth?action=login`;
        break;
    }
  };

  return <div className={style.container}>{renderForm()}</div>;
};

export default LoginPageForm;
