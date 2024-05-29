import { KeyService, service, useApiMutation } from "@/repositories/services";
import { utils } from "@/utils";
import { devToolConfig } from "@/config";
import { useQueryClient } from "@tanstack/react-query";

type DeleteChatAiProps = {
  onSuccess: () => void;
} | void;
type DeleteChatAiOutput = null;
type DeleteChatAiInput = {
  id: string;
};
export const useDeleteChatAiRepo = (props: DeleteChatAiProps) => {
  const queryClient = useQueryClient();

  const { mutate: deleteChatAi, ...rest } = useApiMutation<
    DeleteChatAiOutput,
    DeleteChatAiInput
  >({
    mutationKey: [KeyService.DELETE_CHAT_AI],
    mutationFn: async ({ id }) => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.delete<DeleteChatAiOutput>(`chat/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KeyService.GET_HISTORY_CHAT_AI],
      });

      if (typeof props === "undefined") return;
      props.onSuccess?.();
    },
  });

  return { deleteChatAi, ...rest };
};
