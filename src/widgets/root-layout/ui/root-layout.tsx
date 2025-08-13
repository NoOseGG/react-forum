import { Outlet } from "@tanstack/react-router";

import { Container } from "../../../shared/ui/container/container";
import { Header } from "../../header/ui";
import { SideBar } from "../../side-bar/ui";
import styles from "./root-layout.module.css";

export const RootLayout = () => {
  return (
    <div className={styles.rootLayout}>
      <Container>
        <Header />
        <div className={styles.section}>
          <SideBar />
          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
      </Container>
    </div>
  );
};
