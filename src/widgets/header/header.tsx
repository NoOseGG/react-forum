import { LoginButton, Logo } from "../../shared/ui";
import styles from "./header.module.css";

export const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <header className={styles.header}>
        <Logo />
        <LoginButton />
      </header>
    </div>
  );
};
