import { Link } from "@tanstack/react-router";

import logo from "../../assets/logo.png";
import styles from "./logo.module.css";

export const Logo = () => {
  return (
    <Link to={"/"}>
      <div className={styles.logo}>
        <img className={styles.image} src={logo} alt='logo' />
        <span className={styles.text}>React Forum</span>
      </div>
    </Link>
  );
};
