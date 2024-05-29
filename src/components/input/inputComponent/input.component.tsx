"use client";

import styles from "./component.module.css";
import { FC } from "react";
import { ComponentWithChildBaseModel } from "@/models";

type InputProps = ComponentWithChildBaseModel<{
  title?: string;
  error?: string;
}>;
export const InputComponent: FC<InputProps> = ({
  title,
  children,
  error,
  className,
  style,
}) => {
  return (
    <div className={`${styles.container} ${className}`} style={style}>
      <p>{title}</p>

      {children}

      <p className={styles.error} style={{ opacity: !!error ? 1 : 0 }}>
        {error || "_"}
      </p>
    </div>
  );
};
