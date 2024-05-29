"use client";

import { ComponentBaseModel } from "@/models";
import React, { FC, useState } from "react";
import styles from "./component.module.css";
import { TextInputComponent } from "@/components/input";

export type VirtualizeItem = {
  id: string;
  name: string;
};
type VirtualizeSelectProps = ComponentBaseModel<{
  text?: string;
  items: VirtualizeItem[];
}>;
export const VirtualizeSelectComponent: FC<VirtualizeSelectProps> = ({
  text,
  items,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const deselectedItems: VirtualizeItem[] = items.filter(
    (item) => !selectedIds.includes(item.id)
  );
  const selectedItems: VirtualizeItem[] = items.filter((item) =>
    selectedIds.includes(item.id)
  );

  const onClickAddItem = (id: string) => () =>
    setSelectedIds((prev) => [...prev, id]);
  const onClickRemoveItem = (id: string) => () =>
    setSelectedIds((prev) => prev.filter((i) => i !== id));

  return (
    <div className={styles.container}>
      {!!text && <p>{text}</p>}

      <div className={styles.wrapper}>
        {deselectedItems.map((item) => (
          <div
            key={item.id}
            className={styles.itemContainer}
            onClick={onClickAddItem(item.id)}
          >
            <p>{item.name}</p>
          </div>
        ))}
      </div>

      <div className={styles.wrapper}>
        {selectedItems.map((item) => (
          <div
            key={item.id}
            className={styles.selectedItemContainer}
            onClick={onClickRemoveItem(item.id)}
          >
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
