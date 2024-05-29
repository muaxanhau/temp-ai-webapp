import { utils } from "@/utils";
import { KeyService, auth, useApiMutation } from "../services";
import { devToolConfig } from "@/config";
import { signOut } from "firebase/auth";
import { useQueryClient } from "@tanstack/react-query";
import { resetAllStores } from "@/stores";

type LogoutProps = { onSuccess?: () => void } | void;
type LogoutOutput = void;
export const useLogoutRepo = (props: LogoutProps) => {
  const queryClient = useQueryClient();
  const { mutate: logout, ...rest } = useApiMutation<LogoutOutput>({
    mutationKey: [KeyService.LOGOUT],
    mutationFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      await signOut(auth);
    },
    onSuccess: () => {
      resetAllStores();
      queryClient.clear();

      if (typeof props === "undefined") return;
      props.onSuccess?.();
    },
  });

  return { logout, ...rest };
};
