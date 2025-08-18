import { useNavigate } from "@tanstack/react-router";

import React from "react";

import type { User } from "../../entities/user/model/types/types";
import styles from "./user-card.module.css";

interface Props {
  user: User;
}

export const UserCard: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const onClick = (id: string) => {
    navigate({ to: "/user-info", search: { id: id } });
  };

  return (
    <div className={styles.user} onClick={() => onClick(user.id)}>
      <div className={styles.column}>
        <div className={styles.item}>name: {user.name}</div>
        <div className={styles.item}>email: {user.email}</div>
      </div>
      <div className={styles.column}>
        <div className={styles.item}>address: {user.address}</div>
        <div className={styles.item}>created: {user.createdAt}</div>
      </div>
      <div className={styles.column}>
        <div className={styles.item}>role: {user.role}</div>
      </div>
    </div>
  );
};
