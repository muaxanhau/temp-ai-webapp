"use client";

import { ButtonComponent, HoverViewComponent } from "@/components";
import { ComponentBaseModel } from "@/models";
import { FC, useEffect } from "react";
import styles from "./component.module.css";
import { useRouter } from "next/navigation";
import {
  useGetUserSelfRepo,
  useLoginWithFacebookRepo,
  useLoginWithGoogleRepo,
  useLogoutRepo,
} from "@/repositories";
import { useAuthStore } from "@/stores";
import { Button } from "antd";
import { AiFillFacebook, AiOutlineLoading3Quarters } from "react-icons/ai";
import { LoginContainerStyled } from "./login.styled";
import { FaGoogle } from "react-icons/fa";

export const LoginComponent: FC<ComponentBaseModel> = () => {
  const router = useRouter();
  const { token } = useAuthStore();
  const { user, refetch } = useGetUserSelfRepo();
  const onLoginSuccess = () => router.replace("/app/chat");
  const { loginWithGoogle, isPending: isLoadingLoginWithGoogle } =
    useLoginWithGoogleRepo({
      onSuccess: onLoginSuccess,
    });
  const { loginWithFacebook, isPending: isLoadingLoginWithFacebook } =
    useLoginWithFacebookRepo({
      onSuccess: onLoginSuccess,
    });
  const { logout, isPending: isLoadingLogout } = useLogoutRepo({
    onSuccess: () => router.push("/app/home"),
  });

  useEffect(() => {
    !!token && refetch();
  }, [token]);

  if (!!token) {
    return (
      <HoverViewComponent
        positionHorizontal="right"
        model={
          <div className={styles.loginContainer}>
            <h5>{user?.name}</h5>
            <p>{user?.email}</p>
            <ButtonComponent
              title="Logout"
              color="fail"
              onClick={logout}
              isLoading={isLoadingLogout}
            />
          </div>
        }
      >
        <div className={styles.avatar}>
          <h2>{user?.name?.[0]}</h2>
        </div>
      </HoverViewComponent>
    );
  }

  return (
    <HoverViewComponent
      positionHorizontal="right"
      model={
        <LoginContainerStyled>
          <Button
            className="facebook-btn"
            onClick={() => loginWithFacebook()}
            loading={isLoadingLoginWithFacebook}
            icon={<AiFillFacebook />}
          >
            Facebook
          </Button>
          <Button
            className="google-btn"
            onClick={() => loginWithGoogle()}
            loading={isLoadingLoginWithGoogle}
            icon={<FaGoogle />}
          >
            Google
          </Button>
        </LoginContainerStyled>
      }
    >
      <ButtonComponent title="Login" onClick={() => {}} />
    </HoverViewComponent>
  );
};
