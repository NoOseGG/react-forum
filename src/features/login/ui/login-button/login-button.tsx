import { LogOut, Warehouse } from "lucide-react";

import { useEffect, useState } from "react";

import {
  useSetUser,
  useUser,
} from "../../../../entities/user/model/store/user-store";
import { COLORS } from "../../../../shared/constants/constants";
import { LoginOverlay } from "../login-overlay/login-overlay";
import styles from "./login-button.module.css";

export const LoginButton = () => {
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
  const setUser = useSetUser();
  const user = useUser();

  useEffect(() => {
    if (isOpenSearch) {
      const scrollY = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";

      return () => {
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      };
    }
  }, [isOpenSearch]);

  const onOpen = () => {
    setIsOpenSearch(true);
  };

  const onClose = () => {
    setIsOpenSearch(false);
  };

  const onLogout = () => {
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <div className={styles.name}>
          <span>{user.name}</span>{" "}
          <LogOut size={32} className={styles.logout} onClick={onLogout} />
        </div>
      ) : (
        <div className={styles.login} onClick={onOpen}>
          <Warehouse size={32} color={COLORS.white} />
          <span>Login</span>
        </div>
      )}
      {isOpenSearch && <LoginOverlay onClose={onClose} />}
    </div>
  );
};
