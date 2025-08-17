import { useSearch } from "@tanstack/react-router";

import React from "react";

import styles from "./user-info-page.module.css";

export const UserInfoPage = () => {
  const { id } = useSearch({ strict: false });

  return (
    <div className={styles.userInfo}>
      <h2 className={styles.title}>User Info</h2>
      user-info-page {id}
    </div>
  );
};
