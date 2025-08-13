

import { LoginButton } from "../../../features/login";
import { Logo, Menu } from "../../../shared/ui";
import styles from "./header.module.css";

export const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <header className={styles.header}>
        <Logo />
        <Menu />
        <LoginButton />
      </header>
    </div>
  );
};
