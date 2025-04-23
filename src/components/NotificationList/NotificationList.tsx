import React from "react";
import styles from "./NotificationList.module.css";

type Notification = {
  id: number;
  name: string;
  avatarUrl: string;
  action: string;
  dateGroup: "Hoje" | "Ontem" | "Últimos 7 dias";
};

const notifications: Notification[] = [
  {
    id: 1,
    name: "Irlan Ferreira",
    avatarUrl: "https://randomuser.me/api/portraits/men/11.jpg",
    action: "comentou na sua publicação",
    dateGroup: "Hoje",
  },
  {
    id: 2,
    name: "Guilherme Alves",
    avatarUrl: "https://randomuser.me/api/portraits/men/31.jpg",
    action: "colaborou com o seu código",
    dateGroup: "Ontem",
  },
  {
    id: 3,
    name: "Ismael Rodrigues",
    avatarUrl: "https://randomuser.me/api/portraits/men/53.jpg",
    action: "curtiu a sua publicação",
    dateGroup: "Últimos 7 dias",
  },
  {
    id: 4,
    name: "Ameliara",
    avatarUrl: "https://randomuser.me/api/portraits/women/46.jpg",
    action: "curtiu a sua publicação",
    dateGroup: "Últimos 7 dias",
  },
  {
    id: 5,
    name: "Filippo Régis",
    avatarUrl: "https://randomuser.me/api/portraits/men/76.jpg",
    action: "comentou na sua publicação",
    dateGroup: "Últimos 7 dias",
  },
  {
    id: 6,
    name: "Lívia Moura",
    avatarUrl: "https://randomuser.me/api/portraits/women/19.jpg",
    action: "começou a te seguir",
    dateGroup: "Hoje",
  },
];

const groupByDate = (group: string) =>
  notifications.filter((n) => n.dateGroup === group);

export const NotificationList: React.FC = () => {
  const sections = ["Hoje", "Ontem", "Últimos 7 dias"];

  return (
    <div className={styles.container}>
      {sections.map((section) => (
        <div key={section}>
          <h2 className={styles.sectionTitle}>{section}</h2>
          {groupByDate(section).map((n) => (
            <div key={n.id} className={styles.notificationItem}>
              <img
                src={n.avatarUrl}
                alt={n.name}
                className={styles.avatar}
              />
              <p className={styles.text}>
                <strong>{n.name}</strong> {n.action}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
