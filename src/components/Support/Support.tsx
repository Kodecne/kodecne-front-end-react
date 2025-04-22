import { useState } from 'react';
import styles from './Support.module.css';

type FaqItem = {
  question: string;
  answer: string;
};

const faqData: FaqItem[] = [
  {
    question: 'Como faço para me cadastrar?',
    answer: 'Clique no botão "Cadastrar" no topo da página e preencha seus dados.',
  },
  {
    question: 'Quais cursos são oferecidos?',
    answer: 'Oferecemos cursos voltados para desenvolvimento web, mobile e muito mais. Acesse o feed para ver os cursos disponíveis.',
  },
  {
    question: 'Como entrar em contato?',
    answer: 'Você pode entrar em contato pelo email suporte@exemplo.com. Estamos disponíveis de segunda a sexta, das 9h às 18h.',
  },
  {
    question: 'eu te amo',
    answer: 'eu também te amo boyy',
  },
];

export const Support = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.supportContainer}>
      <h1 className={styles.title}>Suporte</h1>

      <section className={styles.faqSection}>
        <h2 className={styles.subtitle}>
          <span className={styles.icon}>❓</span> Perguntas Frequentes
        </h2>

        <ul className={styles.faqList}>
          {faqData.map((item, index) => (
            <li
              key={index}
              className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className={styles.question}>{item.question}</div>
              {openIndex === index && <div className={styles.answer}>{item.answer}</div>}
            </li>
          ))}
        </ul>
      </section>

      <div className={styles.contact}>
        Email: <a href="mailto:suporte@exemplo.com">suporte@exemplo.com</a>
      </div>
    </div>
  );
};
