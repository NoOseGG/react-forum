import { Link } from "@tanstack/react-router";

import { useUser } from "../../../entities/user/model/store/user-store";
import { SIDER_MENU_ITEM } from "../model/constants";
import styles from "./side-bar.module.css";

export const SideBar = () => {
  const user = useUser();

  return (
    user && (
      <div className={styles.sideBar}>
        {SIDER_MENU_ITEM.map(item => (
          <Link
            to={item.link}
            className={styles.item}
            key={item.link}
            activeProps={{ className: styles.activeItem }}
          >
            {item.title}
          </Link>
        ))}
      </div>
    )
  );
};
