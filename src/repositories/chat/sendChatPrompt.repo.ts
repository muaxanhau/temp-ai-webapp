import { KeyService, service, useApiMutation } from "@/repositories/services";
import { utils } from "@/utils";
import { devToolConfig } from "@/config";
import { ChatIdModel } from "@/models";
import { useQueryClient } from "@tanstack/react-query";

type SendChatPromptProps = {
  onSuccess: () => void;
} | void;
type SendChatPromptOutput = ChatIdModel;
type SendChatPromptInput = {
  prompt: string;
};
export const useSendChatPromptRepo = (props: SendChatPromptProps) => {
  const queryClient = useQueryClient();

  const { mutate: sendChatPrompt, ...rest } = useApiMutation<
    SendChatPromptOutput,
    SendChatPromptInput
  >({
    mutationKey: [KeyService.SEND_PROMPT_AI],
    mutationFn: async ({ prompt }) => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.post<
        SendChatPromptOutput,
        SendChatPromptInput
      >("chat", { prompt });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [KeyService.GET_HISTORY_CHAT_AI],
      });

      if (typeof props === "undefined") return;
      props.onSuccess?.();
    },
  });

  return { sendChatPrompt, ...rest };
};
