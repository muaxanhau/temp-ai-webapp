import { KeyService, service, useApiMutation } from "@/repositories/services";
import { utils } from "@/utils";
import { devToolConfig } from "@/config";
import { RoleEnum, UserIdModel } from "@/models";
import { useQueryClient } from "@tanstack/react-query";
import { GetUserOutput } from "./getUserSelf.repo";

export type AddUserInput = { id: string; role: RoleEnum };
export type AddUserOutput = UserIdModel;
export const useAddUserRepo = () => {
  const queryClient = useQueryClient();

  const { mutate: addUser, ...rest } = useApiMutation<
    AddUserOutput,
    AddUserInput
  >({
    mutationKey: [KeyService.ADD_USER],
    mutationFn: async (data) => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.post<AddUserOutput, AddUserInput>(
        "users",
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<GetUserOutput>([KeyService.GET_USER_SELF], data);
    },
  });

  return { addUser, ...rest };
};
