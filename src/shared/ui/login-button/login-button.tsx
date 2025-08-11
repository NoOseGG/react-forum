import { Warehouse } from "lucide-react";

import { COLORS } from "../../constants/constants";
import styles from "./login-button.module.css";

export const LoginButton = () => {
  return (
    <div className={styles.login}>
      <Warehouse size={32} color={COLORS.white} />
      <span>Login</span>
    </div>
  );
};
