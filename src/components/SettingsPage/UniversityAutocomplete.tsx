import React, { useState, useEffect } from 'react';
import style from './Style-SettingsPage.module.css';
import universidades from './universidades.json'; // ajuste o caminho se necessário

type Universidade = {
    nome: string;
    sigla: string;
    uf: string;
};

type Props = {
    value: string;
    onChange: (value: string) => void;
};

const UniversityAutocomplete: React.FC<Props> = ({ value, onChange }) => {
    const [query, setQuery] = useState(value);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        if (query.length < 2) {
            setSuggestions([]);
            return;
        }

        const filtro = query.toLowerCase();
        const resultado = universidades
            .filter((uni) =>
                uni.nome.toLowerCase().includes(filtro) ||
                String(uni.sigla).toLowerCase().includes(filtro) // força para string aqui
            )
            .map((uni) => `${uni.nome} (${String(uni.sigla)} - ${uni.uf})`);

        setSuggestions(resultado);
    }, [query]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setQuery(newValue);

        // Verifica se o valor inserido corresponde a alguma sugestão
        const isValid = suggestions.includes(newValue);
        if (isValid) {
            onChange(newValue); // Apenas atualiza o valor se for uma sugestão válida
        } else {
            onChange(""); // Caso contrário, reseta o valor
        }
    };

    return (
        <div className={style.inputContainer}>
            <label htmlFor="escolaridade" className={style.label}>Universidade</label>
            <input
                id="escolaridade"
                name="escolaridade"
                type="text"
                value={query}
                onChange={handleChange}
                list="university-suggestions"
                className={style.inputField}
                autoComplete="off"
            />
            <datalist id="university-suggestions">
                {suggestions.map((name) => (
                    <option key={name} value={name} />
                ))}
            </datalist>
        </div>
    );
};

export default UniversityAutocomplete;
