import React, { type PropsWithChildren } from "react";

import styles from "./container.module.css";

export const Container: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
