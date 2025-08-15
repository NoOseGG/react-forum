import { Link } from "@tanstack/react-router";
import { House, StickyNote, Users } from "lucide-react";

import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import { COLORS } from "../../constants/constants";
import styles from "./menu.module.css";

export const Menu = () => {
  return (
    <ul className={styles.menu}>
      <Link
        to={"/"}
        className={styles.item}
        activeProps={{ className: styles.activeItem }}
        data-tooltip-id='home'
        data-tooltip-content='Home'
      >
        <House size={32} color={COLORS.white} />
      </Link>
      <Link
        to={"/posts"}
        className={styles.item}
        activeProps={{ className: styles.activeItem }}
        data-tooltip-id='posts'
        data-tooltip-content='Posts'
      >
        <StickyNote size={32} color={COLORS.white} />
      </Link>
      <Link
        to={"/users"}
        className={styles.item}
        activeProps={{ className: styles.activeItem }}
        data-tooltip-id='users'
        data-tooltip-content='Users'
      >
        <Users size={32} color={COLORS.white} />
      </Link>
      <ReactTooltip id='home' place='bottom' />
      <ReactTooltip id='posts' place='bottom' />
      <ReactTooltip id='users' place='bottom' />
    </ul>
  );
};
