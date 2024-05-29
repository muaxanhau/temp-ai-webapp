import { ComponentBaseModel } from "@/models";
import React, { FC } from "react";
import styles from "./component.module.css";

export const ActivityIndicatorComponent: FC<ComponentBaseModel> = ({
  style,
}) => {
  return (
    <div className={styles.container} style={style}>
      <div className={`${styles.peace} ${styles.peace1}`} />
      <div className={`${styles.peace} ${styles.peace2}`} />
      <div className={`${styles.peace} ${styles.peace3}`} />
      <div className={`${styles.peace} ${styles.peace4}`} />
    </div>
  );
};
