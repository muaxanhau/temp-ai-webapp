import { ComponentBaseModel } from "@/models";
import React, { FC } from "react";
import styles from "./component.module.css";
import { ActivityIndicatorComponent } from "@/components/loader";

type TypeType = "default" | "outline";
type ColorType = "default" | "success" | "warning" | "fail";
type ColorObjModel = {
  [key in ColorType]: {
    [key in TypeType]: {
      background: string;
      text: string;
    };
  } & {
    border: string;
  };
};
const colorObj: ColorObjModel = {
  default: {
    default: {
      background: "var(--color-accent-1)",
      text: "var(--white)",
    },
    outline: {
      background: "var(--primary100)",
      text: "var(--primary700)",
    },
    border: "var(--primary)",
  },
  success: {
    default: {
      background: "var(--green)",
      text: "var(--white)",
    },
    outline: {
      background: "var(--green100)",
      text: "var(--green700)",
    },
    border: "var(--green)",
  },
  warning: {
    default: {
      background: "var(--yellow)",
      text: "var(--white)",
    },
    outline: {
      background: "var(--yellow100)",
      text: "var(--yellow700)",
    },
    border: "var(--yellow)",
  },
  fail: {
    default: {
      background: "var(--red)",
      text: "var(--white)",
    },
    outline: {
      background: "var(--red100)",
      text: "var(--red700)",
    },
    border: "var(--red)",
  },
};

type ButtonProps = ComponentBaseModel<{
  title: string;
  onClick: () => void;
  type?: TypeType;
  color?: ColorType;
  disabled?: boolean;
  isLoading?: boolean;
}>;
export const ButtonComponent: FC<ButtonProps> = ({
  onClick,
  title,
  type = "default",
  color = "default",
  disabled,
  isLoading,
  style,
}) => {
  const { background, text } = colorObj[color][type];
  const { border } = colorObj[color];
  const titleColor = disabled || isLoading ? "var(--neutral)" : text;

  const onClickButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    !disabled && !isLoading && onClick();
  };

  return (
    <button
      className={styles.container}
      style={{ backgroundColor: background, borderColor: border, ...style }}
      onClick={onClickButton}
    >
      <p style={{ color: titleColor }}>{title}</p>

      {isLoading && (
        <div className={styles.activityIndicator}>
          <ActivityIndicatorComponent />
        </div>
      )}
    </button>
  );
};
