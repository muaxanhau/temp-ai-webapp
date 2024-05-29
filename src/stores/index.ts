import { useAuthStore } from "./auth.store";
import { useHomePageStore } from "./home.page.store";
import { useLandingPageStore } from "./landing.page.store";

export * from "./auth.store";
export * from "./home.page.store";
export * from "./landing.page.store";

export const resetAllStores = () => {
  // define all stores here
  const stores = [useAuthStore, useHomePageStore, useLandingPageStore];

  stores.forEach((store) => store.getState().reset());
};
