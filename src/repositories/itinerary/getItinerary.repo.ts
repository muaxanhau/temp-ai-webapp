import {
  KeyService,
  service,
  useApiMutation,
  useApiQuery,
} from "@/repositories/services";
import { utils } from "@/utils";
import { devToolConfig } from "@/config";

type GetItineraryInput = {
  destination: string;
  startDate: Date;
  endDate: Date;
  travelTypes: string[];
  quantity: string;
  activities: string[];
};
type GetItineraryOutput = {
  schedule: {
    locationName: string;
    coords: [number, number];
    day: number;
    time: string;
    note: string;
    link: string;
  }[];
  accommodations: {
    accommodationName: string;
    coords: [number, number];
    description: string;
    link: string;
  }[];
};
export const useGetItineraryRepo = () => {
  const {
    data: itinerary,
    mutate: getItinerary,
    ...rest
  } = useApiMutation<GetItineraryOutput, GetItineraryInput>({
    mutationKey: [KeyService.GET_ITINERARY],
    mutationFn: async (data) => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.post<
        GetItineraryOutput,
        GetItineraryInput
      >(`itinerary`, data);
      return response.data;
    },
  });

  return { itinerary, getItinerary, ...rest };
};
