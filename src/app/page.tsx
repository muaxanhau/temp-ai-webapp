"use client";

import { Header } from "@/components/common/header/header";
import { ScreenBaseModel } from "@/models";
import { useSetupUserRepo } from "@/repositories";
import { useFirstSetupApp } from "@/utils";

const Page: ScreenBaseModel = () => {
  useFirstSetupApp();
  useSetupUserRepo();

  return (
    <div>
      <Header />
    </div>
  );
};

export default Page;
