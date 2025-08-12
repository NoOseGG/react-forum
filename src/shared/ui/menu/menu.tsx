import { Link } from "@tanstack/react-router";
import { House, StickyNote, Users } from "lucide-react";

import { COLORS } from "../../constants/constants";
import styles from "./menu.module.css";

export const Menu = () => {
  return (
    <ul className={styles.menu}>
      <Link
        to={"/"}
        className={styles.item}
        activeProps={{ className: styles.activeItem }}
      >
        <House size={32} color={COLORS.white} />
      </Link>
      <Link
        to={"/posts"}
        className={styles.item}
        activeProps={{ className: styles.activeItem }}
      >
        <StickyNote size={32} color={COLORS.white} />
      </Link>
      <Link
        to={"/users"}
        className={styles.item}
        activeProps={{ className: styles.activeItem }}
      >
        <Users size={32} color={COLORS.white} />
      </Link>
    </ul>
  );
};
