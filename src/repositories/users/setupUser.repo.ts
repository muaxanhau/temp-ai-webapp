import { KeyService, service, useApiQuery } from "@/repositories/services";
import { utils } from "@/utils";
import { devToolConfig } from "@/config";

export type SetupUserOutput = null;
export type SetupUserInput = { deviceId: string };
export const useSetupUserRepo = () => {
  // const { getDeviceId } = usePushNotification();

  const query = useApiQuery<SetupUserOutput>({
    queryKey: [KeyService.SETUP_USER],
    queryFn: async () => {
      console.log("________________");
      await utils.sleep(devToolConfig.delayFetching);

      // const deviceId =  await getDeviceId();
      const deviceId = "";
      console.log("deviceId --------");
      console.log(deviceId);
      if (!deviceId) return null;

      const response = await service.post<SetupUserOutput, SetupUserInput>(
        "users/setup",
        {
          deviceId,
        }
      );
      return response.data;
    },
  });

  return query;
};
