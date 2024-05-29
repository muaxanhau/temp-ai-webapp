import { UserCredential, signInWithPopup } from "firebase/auth";
import {
  KeyService,
  auth,
  googleAuthProvider,
  useApiMutation,
} from "../services";
import { utils } from "@/utils";
import { devToolConfig } from "@/config";
import { useAuthStore } from "@/stores";
import { useAddUserRepo } from "../users";
import { RoleEnum } from "@/models";

type LoginWithGoogleProps = { onSuccess?: () => void } | void;
type LoginWithGoogleOutput = UserCredential;
export const useLoginWithGoogleRepo = (props: LoginWithGoogleProps) => {
  const { addUser } = useAddUserRepo();
  const { setToken } = useAuthStore();

  const { mutate: loginWithGoogle, ...rest } =
    useApiMutation<LoginWithGoogleOutput>({
      mutationKey: [KeyService.LOGIN_WITH_GOOGLE],
      mutationFn: async () => {
        await utils.sleep(devToolConfig.delayFetching);

        const user = await signInWithPopup(auth, googleAuthProvider);
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

  return { loginWithGoogle, ...rest };
};
