import React, { useState, useEffect } from 'react';
import { fetchMe } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import style from "./Style-SettingsPage.module.css";
import api from '../../services/api';
import { toast } from 'react-toastify';

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section = ({ title, children }: SectionProps) => (
  <div className="mb-8">
    <h2 className={style.sectionTitle}>{title}</h2>
    <div className={style.sectionContent}>{children}</div>
  </div>
);

type InputFieldProps = {
  label: string;
  name: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({ label, name, value, onChange, type = "text" }: InputFieldProps) => (
  <div className={style.inputContainer}>
    <label htmlFor={name} className={style.label}>{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={style.inputField}
    />
  </div>
);

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    email: '',
    telefone: '',
    endereco: '',
    escolaridade: '',
    genero: '',
    data_nascimento: '',
    instagram: '',
    github: '',
  });

  const navigate = useNavigate()
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [newEmail, setNewEmail] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [emailCodeSent, setEmailCodeSent] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  useEffect(()=>{
    async function obterUsuario(){
        const user = await fetchMe()
        if (user == null){
            navigate('/login')
        }
    }
    obterUsuario()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Cria um novo objeto apenas com campos preenchidos
    const dadosFiltrados = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value.trim() !== "")
    );

    const form = new FormData()
    Object.entries(dadosFiltrados).forEach(([key, value]) => {
      form.append(key, value);
    });

    if (profileImage) {
      form.append("imagem", profileImage);
    }

    const atualizarDados = async()=>{
      try{
        await api.patch('/users/me/', form, {
          headers:{
            'Content-Type': 'multipart/form-data'
          }
        })
        toast.success("Informações atualizadas com sucesso!")
      }catch(error){
        console.error("errooooooooo", error);
        toast.error("Ocorreu um erro ao processar as informações.")
      }
    }
    atualizarDados()
  };

  const handleSendCode = () => {
    if (!newEmail.includes('@')) {
      alert('Digite um e-mail válido.');
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setEmailCodeSent(true);
    console.log(`Código de verificação enviado para ${newEmail}: ${code}`);
    alert(`(Simulação) Código enviado para ${newEmail}`);
  };

  const handleConfirmEmailChange = () => {
    if (emailCode === generatedCode) {
      setFormData((prev) => ({ ...prev, email: newEmail }));
      alert('E-mail alterado com sucesso!');
      setNewEmail('');
      setEmailCode('');
      setEmailCodeSent(false);
    } else {
      alert('Código incorreto. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.pageContainer}>
      <h1 className={style.pageTitle}>Configurações</h1>

      <Section title="Perfil">
        <InputField label="Nome" name="name" value={formData.name} onChange={handleChange} />
        <div className={style.inputContainer}>
          <label htmlFor="imagem" className={style.label}>Imagem de Perfil</label>
          <input id="imagem" name="imagem" className={style.inputField} type="file" accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              setProfileImage(e.target.files[0]);
            }
          }}
          />
        </div>
        <InputField label="Bio" name="bio" value={formData.bio} onChange={handleChange} />
        <InputField label="Telefone" name="telefone" value={formData.telefone} onChange={handleChange} />
        <InputField label="Endereço" name="endereco" value={formData.endereco} onChange={handleChange} />
        <InputField label="Escolaridade" name="escolaridade" value={formData.escolaridade} onChange={handleChange} />
        <InputField label="Gênero" name="genero" value={formData.genero} onChange={handleChange} />
        <InputField label="Data de nascimento" type="date" name="data_nascimento" value={formData.data_nascimento} onChange={handleChange} />
      </Section>

      <Section title="Redes Sociais">
        <InputField label="Instagram" name="instagram" value={formData.instagram} onChange={handleChange} />
        <InputField label="GitHub" name="github" value={formData.github} onChange={handleChange} />
      </Section>

      <Section title="Troca de E-mail">
        <InputField
          label="Novo e-mail"
          name="newEmail"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />

        <button
          type="button"
          className={style.secondaryButton}
          onClick={handleSendCode}
        >
          Enviar código de verificação
        </button>

        {emailCodeSent && (
          <>
            <InputField
              label="Código recebido"
              name="emailCode"
              value={emailCode}
              onChange={(e) => setEmailCode(e.target.value)}
            />
            <button
              type="button"
              className={style.secondaryButton}
              onClick={handleConfirmEmailChange}
            >
              Confirmar troca de e-mail
            </button>
          </>
        )}
      </Section>

      <div className={style.saveButtonContainer}>
        <button
          type="submit"
          className={style.saveButton}
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default SettingsPage;
