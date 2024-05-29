"use client";

import { ComponentWithChildBaseModel } from "@/models";
import React, { FC, useState } from "react";
import styles from "./component.module.css";

type HoverViewProps = ComponentWithChildBaseModel<{
  model: JSX.Element;
  positionVertical?: "top" | "bottom";
  positionHorizontal?: "left" | "middle" | "right";
}>;
export const HoverViewComponent: FC<HoverViewProps> = ({
  children,
  style,
  className,
  model,
  positionVertical = "bottom",
  positionHorizontal = "middle",
}) => {
  const [displayModel, setDisplayModel] = useState(false);

  const top = positionVertical === "bottom" ? "100%" : undefined;
  const bottom = positionVertical === "top" ? "100%" : undefined;
  const left =
    positionHorizontal === "left"
      ? 0
      : positionHorizontal === "middle"
      ? "50%"
      : undefined;
  const transform =
    positionHorizontal === "middle" ? "translateX(-50%)" : undefined;
  const right = positionHorizontal === "right" ? 0 : undefined;

  return (
    <div
      className={`${styles.parent} ${className}`}
      style={style}
      onMouseEnter={() => setDisplayModel(true)}
      onMouseLeave={() => setDisplayModel(false)}
    >
      {children}
      {displayModel && (
        <div
          className={styles.container}
          style={{ top, bottom, left, transform, right }}
        >
          <div className={styles.wrapper}>{model}</div>
        </div>
      )}
    </div>
  );
};
