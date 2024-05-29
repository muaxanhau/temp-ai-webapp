import { DevToolConfigModel, EnvironmentsConfigModel } from "./models";

const environments: EnvironmentsConfigModel = {
  DEVELOPMENT: {
    enableLog: true,
    version: {
      phase: 1,
      release: 0,
      build: 0,
    },
    staleTime: 1000 * 15,

    baseUrl: "http://localhost:3000/v1/api/",

    firebase: {
      apiKey: "AIzaSyCpcczFlg-Ph_L3TVLFOsllt3vv4MGVFpE",
      authDomain: "travel-gen-ai.firebaseapp.com",
      projectId: "travel-gen-ai",
      storageBucket: "travel-gen-ai.appspot.com",
      messagingSenderId: "818335010879",
      appId: "1:818335010879:web:56ac83dfe7c1178573e88a",
      measurementId: "G-6SXDK6DT53",
    },
    tokenName: "firebase-token",
  },
  STAGING: {
    enableLog: true,
    version: {
      phase: 1,
      release: 0,
      build: 0,
    },
    baseUrl: "https://temp-ai-server.adaptable.app/v1/api/",
    staleTime: 1000 * 15,
    firebase: {
      apiKey: "AIzaSyCpcczFlg-Ph_L3TVLFOsllt3vv4MGVFpE",
      authDomain: "travel-gen-ai.firebaseapp.com",
      projectId: "travel-gen-ai",
      storageBucket: "travel-gen-ai.appspot.com",
      messagingSenderId: "818335010879",
      appId: "1:818335010879:web:56ac83dfe7c1178573e88a",
      measurementId: "G-6SXDK6DT53",
    },
    tokenName: "firebase-token",
  },
  PRODUCTION: {
    enableLog: false,
    version: {
      phase: 1,
      release: 0,
      build: 0,
    },
    baseUrl: "",
    staleTime: 1000 * 15,
    firebase: {
      apiKey: "",
      authDomain: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      measurementId: "",
    },
    tokenName: "",
  },
} as const;

/**
 * *******************************
 * *** change environment here ***
 * *******************************
 */
export const config = environments.STAGING;

/**
 * debug log for response api
 */
export const devToolConfig: DevToolConfigModel = {
  delayFetching: 0, // delay fetch data from server
};
