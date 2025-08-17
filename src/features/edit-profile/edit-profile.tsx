import { UserPen } from "lucide-react";

import React from "react";

import styles from "./edit-profile.module.css";

export const EditProfile = () => {
  return (
    <div className={styles.editProfile}>
      Edit Profile
      <UserPen />
    </div>
  );
};
