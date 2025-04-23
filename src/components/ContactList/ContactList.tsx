import React from "react";
import { Link } from "react-router-dom";
import styles from "./ContactList.module.css";

type Contact = {
  id: number;
  name: string;
  lastMessage: string;
  lastInteraction: string;
  avatarUrl: string;
};

const contacts: Contact[] = [
    {
      id: 1,
      name: "Alice Monteiro",
      lastMessage: "Oi! Tudo certo para amanhã?",
      lastInteraction: "22 de abr. de 2025",
      avatarUrl: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      id: 2,
      name: "Bruno Carvalho",
      lastMessage: "Envia aquele link, por favor!",
      lastInteraction: "21 de abr. de 2025",
      avatarUrl: "https://randomuser.me/api/portraits/men/34.jpg",
    },
    {
      id: 3,
      name: "Camila Duarte",
      lastMessage: "Terminou o projeto?",
      lastInteraction: "20 de abr. de 2025",
      avatarUrl: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      id: 4,
      name: "Diego Silva",
      lastMessage: "Vamos jogar mais tarde?",
      lastInteraction: "18 de abr. de 2025",
      avatarUrl: "https://randomuser.me/api/portraits/men/90.jpg",
    },
    {
      id: 5,
      name: "Elisa Souza",
      lastMessage: "Te mando os arquivos já!",
      lastInteraction: "15 de abr. de 2025",
      avatarUrl: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      id: 6,
      name: "Fernando Rocha",
      lastMessage: "Ficou incrível o design!",
      lastInteraction: "14 de abr. de 2025",
      avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
      id: 7,
      name: "Giovana Lima",
      lastMessage: "Podemos fazer uma call?",
      lastInteraction: "13 de abr. de 2025",
      avatarUrl: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      id: 8,
      name: "Henrique Alves",
      lastMessage: "Já subi no GitHub.",
      lastInteraction: "11 de abr. de 2025",
      avatarUrl: "https://randomuser.me/api/portraits/men/23.jpg",
    },
    {
      id: 9,
      name: "Isabela Fernandes",
      lastMessage: "Passa seu número!",
      lastInteraction: "10 de abr. de 2025",
      avatarUrl: "https://randomuser.me/api/portraits/women/29.jpg",
    },
    {
      id: 10,
      name: "João Pedro Martins",
      lastMessage: "Tô indo agora!",
      lastInteraction: "08 de abr. de 2025",
      avatarUrl: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
      id: 11,
      name: "Karen Ribeiro",
      lastMessage: "Não esquece da reunião!",
      lastInteraction: "07 de abr. de 2025",
      avatarUrl: "https://randomuser.me/api/portraits/women/14.jpg",
    },
    {
      id: 12,
      name: "Lucas Almeida",
      lastMessage: "A gente se vê lá.",
      lastInteraction: "05 de abr. de 2025",
      avatarUrl: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      id: 13,
      name: "Marina Teixeira",
      lastMessage: "Tudo resolvido :)",
      lastInteraction: "03 de abr. de 2025",
      avatarUrl: "https://randomuser.me/api/portraits/women/39.jpg",
    },
    {
      id: 14,
      name: "Nicolas Torres",
      lastMessage: "Foi mal a demora!",
      lastInteraction: "02 de abr. de 2025",
      avatarUrl: "https://randomuser.me/api/portraits/men/55.jpg",
    },
    {
      id: 15,
      name: "Olívia Rocha",
      lastMessage: "Tá confirmado já!",
      lastInteraction: "01 de abr. de 2025",
      avatarUrl: "https://randomuser.me/api/portraits/women/88.jpg",
    },
  ];
  

export const ContactList: React.FC = () => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Pesquisar"
        className={styles.searchInput}
      />
      <ul className={styles.contactList}>
        {contacts.map((contact) => (
          <li key={contact.id} className={styles.contactItem}>
            <Link to="#" className={styles.contactLink}>
              <div className={styles.contactInfo}>
                <img
                  src={contact.avatarUrl}
                  alt={contact.name}
                  className={styles.avatar}
                />
                <div>
                  <p className={styles.contactName}>{contact.name}</p>
                  <p className={styles.contactMessage}>
                    {contact.lastMessage}
                  </p>
                </div>
              </div>
              <p className={styles.contactDate}>{contact.lastInteraction}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
