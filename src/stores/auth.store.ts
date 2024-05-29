import { ActionStoreBaseModel } from "@/models";
import { create } from "zustand";

type State = {
  token?: string;
};
type Action = ActionStoreBaseModel<{
  setStore: (input: Partial<State>) => void;
  setToken: (token: string | undefined) => void;
}>;
const initialState: State = {
  token: undefined,
};
export const useAuthStore = create<State & Action>((set) => ({
  ...initialState,
  reset: () => set(initialState),
  setStore: (input) => set((state) => ({ ...state, ...input })),

  setToken: (token) => set(() => ({ token })),
}));
