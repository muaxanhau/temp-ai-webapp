"use client";

import React, { FC } from "react";
import { ComponentBaseModel } from "@/models";
import { useRouter } from "next/navigation";
import { useCanGoBack } from "@/utils";
import { ButtonComponent, LoginComponent } from "@/components";
import styles from "./component.module.css";

export const TopBarComponent: FC<ComponentBaseModel> = () => {
  const router = useRouter();
  const canGoBack = useCanGoBack();

  return (
    <div className={styles.container}>
      <ButtonComponent
        title="Back"
        onClick={router.back}
        type="outline"
        style={{ opacity: canGoBack ? 1 : 0 }}
        disabled={!canGoBack}
      />

      <ButtonComponent
        title="Home"
        color="success"
        onClick={() => router.push("/app/home")}
      />

      <ButtonComponent
        title="Profile"
        color="success"
        type="outline"
        onClick={() => router.push("/app/profile")}
      />

      <ButtonComponent title="Chat" onClick={() => router.push("/app/chat")} />

      <ButtonComponent
        title="Plan"
        type="outline"
        onClick={() => router.push("/app/plan")}
      />

      <LoginComponent />
    </div>
  );
};
