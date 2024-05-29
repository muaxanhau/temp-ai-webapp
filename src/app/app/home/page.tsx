"use client";

import { homeSchema, ScreenBaseModel } from "@/models";
import { useHomePageStore } from "@/stores";
import React from "react";
import styles from "./page.module.css";
import { useHookForm } from "@/utils";
import {
  ButtonComponent,
  DateInputComponent,
  TextInputComponent,
} from "@/components";
import { useRouter } from "next/navigation";
import { Header } from "@/components/common/header/header";

const Page: ScreenBaseModel = () => {
  const router = useRouter();

  const { destination, startDate, endDate, setStore } = useHomePageStore();

  const { control, handleSubmit } = useHookForm({
    schema: homeSchema,
    defaultValues: { destination, startDate, endDate },
  });

  const onClickStart = handleSubmit((data) => {
    setStore(data);
    router.push("/app/reference");
  });

  return (
    <div>
      <Header />
    </div>
  );
};

export default Page;
