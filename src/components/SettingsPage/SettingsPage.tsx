import React, { useState } from 'react';
import style from "./Style-SettingsPage.module.css";

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
    phone: '',
    address: '',
    education: '',
    gender: '',
    birthdate: '',
    instagram: '',
    github: '',
  });

  const [newEmail, setNewEmail] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [emailCodeSent, setEmailCodeSent] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados enviados:', formData);
    // aqui você pode fazer a requisição à API
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
        <InputField label="Bio" name="bio" value={formData.bio} onChange={handleChange} />
        <InputField label="Telefone" name="phone" value={formData.phone} onChange={handleChange} />
        <InputField label="Endereço" name="address" value={formData.address} onChange={handleChange} />
        <InputField label="Escolaridade" name="education" value={formData.education} onChange={handleChange} />
        <InputField label="Gênero" name="gender" value={formData.gender} onChange={handleChange} />
        <InputField label="Data de nascimento" type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />
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
