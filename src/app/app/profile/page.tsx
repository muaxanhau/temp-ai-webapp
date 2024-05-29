"use client";

import { ScreenBaseModel } from "@/models";
import { useGetUserSelfRepo } from "@/repositories";
import React from "react";

const Page: ScreenBaseModel = () => {
  const { user } = useGetUserSelfRepo();

  return (
    <div>
      <h1>Profile</h1>

      <h3>Role: {user?.role}</h3>
    </div>
  );
};

export default Page;
