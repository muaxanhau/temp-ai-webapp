import { ActionStoreBaseModel } from "@/models";
import { create } from "zustand";

type State = {
  destination: string;
  startDate?: Date;
  endDate?: Date;
};
type Action = ActionStoreBaseModel<{
  setStore: (input: Partial<State>) => void;
  setDestination: (destination: string) => void;
  setStartDate: (startDate: Date) => void;
  setEndDate: (endDate: Date) => void;
}>;
const initialState: State = {
  destination: "",
  startDate: undefined,
  endDate: undefined,
};
export const useHomePageStore = create<State & Action>((set) => ({
  ...initialState,
  reset: () => set(initialState),
  setStore: (input) => set((state) => ({ ...state, ...input })),

  setDestination: (destination) => set(() => ({ destination })),
  setStartDate: (startDate) => set(() => ({ startDate })),
  setEndDate: (endDate) => set(() => ({ endDate })),
}));
