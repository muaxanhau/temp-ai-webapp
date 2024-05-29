import { ActionStoreBaseModel } from "@/models";
import dayjs from "dayjs";
import { create } from "zustand";

type State = {
  destination: string | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
};
type Action = ActionStoreBaseModel<{
  setStore: (input: Partial<State>) => void;
}>;
const initialState: State = {
  destination: undefined,
  startDate: dayjs().format("YYYY-MM-DD"),
  endDate: dayjs().format("YYYY-MM-DD"),
};
export const useLandingPageStore = create<State & Action>((set) => ({
  ...initialState,
  reset: () => set(initialState),
  setStore: (input) => set((state) => ({ ...state, ...input })),
}));
