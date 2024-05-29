import { UserCredential, signInWithPopup } from "firebase/auth";
import {
  KeyService,
  auth,
  facebookAuthProvider,
  useApiMutation,
} from "../services";
import { utils } from "@/utils";
import { devToolConfig } from "@/config";
import { useAuthStore } from "@/stores";
import { useAddUserRepo } from "../users";
import { RoleEnum } from "@/models";

type LoginWithFacebookProps = { onSuccess?: () => void } | void;
type LoginWithFacebookOutput = UserCredential;
export const useLoginWithFacebookRepo = (props: LoginWithFacebookProps) => {
  const { addUser } = useAddUserRepo();
  const { setToken } = useAuthStore();

  const { mutate: loginWithFacebook, ...rest } =
    useApiMutation<LoginWithFacebookOutput>({
      mutationKey: [KeyService.LOGIN_WITH_FACEBOOK],
      mutationFn: async () => {
        await utils.sleep(devToolConfig.delayFetching);

        const user = await signInWithPopup(auth, facebookAuthProvider);
        return user;
      },
      onSuccess: async (data) => {
        addUser({ id: data.user.uid, role: RoleEnum.USER });

        const token = await data.user.getIdToken();
        setToken(token);

        if (typeof props === "undefined") return;
        props.onSuccess?.();
      },
    });

  return { loginWithFacebook, ...rest };
};
