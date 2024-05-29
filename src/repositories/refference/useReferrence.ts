import {
  KeyService,
  service,
  useApiMutation,
  useApiQuery,
} from "@/repositories/services";
import { utils } from "@/utils";
import { devToolConfig } from "@/config";
import {
  TItineraryReferenceRequest,
  TItineraryReferenceRes,
  TReferenceResponse,
} from "@/models/server";

export const useGetReferences = () => {
  const { data, ...rest } = useApiQuery<TReferenceResponse>({
    queryKey: [KeyService.GET_HISTORY_CHAT_AI],
    queryFn: async () => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.get<TReferenceResponse>(`references`);
      return response.data;
    },
  });

  return { data, ...rest };
};

export const useGetItineraryRefRepo = () => {
  const {
    data: itinerary,
    mutate: getItinerary,
    ...rest
  } = useApiMutation<TItineraryReferenceRes, TItineraryReferenceRequest>({
    mutationKey: [KeyService.GET_ITINERARY],
    mutationFn: async (data) => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.post<
        TItineraryReferenceRes,
        TItineraryReferenceRequest
      >(`itinerary/from-references`, data);
      return response.data;
    },
  });

  return { itinerary, getItinerary, ...rest };
};
