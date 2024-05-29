import { KeyService, service, useApiQuery } from "@/repositories/services";
import { utils } from "@/utils";
import { devToolConfig } from "@/config";
import { ChatIdModel } from "@/models";

type GetHistoryChatOutput = ChatIdModel[];
export const useGetHistoryChatRepo = () => {
  const { data: messages, ...rest } = useApiQuery<GetHistoryChatOutput>({
    queryKey: [KeyService.GET_HISTORY_CHAT_AI],
    queryFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.get<GetHistoryChatOutput>(`chat`);
      return response.data.reverse();
    },
  });

  return { messages, ...rest };
};
