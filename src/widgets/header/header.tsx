import { LoginButton } from "../../features/login/ui/login-button/login-button";
import { Logo } from "../../shared/ui";
import { Menu } from "../../shared/ui/menu/menu";
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
