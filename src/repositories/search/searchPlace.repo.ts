"use client";
import {
  KeyService,
  service,
  useApiMutation,
  useApiQuery,
} from "@/repositories/services";
import { utils } from "@/utils";
import { devToolConfig } from "@/config";

type SearchPlacesInput = {
  value: string;
};
type SearchPlacesOutput = string[];
export const useSearchPlaceRepo = () => {
  const {
    data: places,
    mutate: searchPlaces,
    ...rest
  } = useApiMutation<SearchPlacesOutput, SearchPlacesInput>({
    mutationKey: [KeyService.SEARCH_PLACES],
    mutationFn: async ({ value }) => {
      await utils.sleep(devToolConfig.delayFetching);

      const response = await service.get<SearchPlacesOutput>(`search/places`, {
        params: {
          value,
        },
      });
      return response.data;
    },
  });

  return { places, searchPlaces, ...rest };
};
