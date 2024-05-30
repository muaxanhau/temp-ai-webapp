import { DevToolConfigModel, EnvironmentsConfigModel } from "./models";

const environments: EnvironmentsConfigModel = {
  LOCAL_DEVELOPMENT: {
    // run for localhost
    enableLog: true,
    version: {
      phase: 1,
      release: 0,
      build: 0,
    },
    staleTime: 1000 * 15,

    baseUrl: "http://localhost:3000/v1/api/",

    firebase: {
      apiKey: "AIzaSyDrN1mgPMEpJe__B7GPNaw2Vju8AJxO6Hg",
      authDomain: "travel-gen-ai-dev.firebaseapp.com",
      projectId: "travel-gen-ai-dev",
      storageBucket: "travel-gen-ai-dev.appspot.com",
      messagingSenderId: "353890103563",
      appId: "1:353890103563:web:e130c7687f3ea84cab720e",
      measurementId: "G-TWVMLEGJ8Q",
    },
    tokenName: "firebase-token",
  },
  DEVELOPMENT: {
    // run for dev mode but public
    enableLog: true,
    version: {
      phase: 1,
      release: 0,
      build: 0,
    },
    staleTime: 1000 * 15,

    baseUrl: "https://temp-ai-server.adaptable.app/v1/api/",

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
    enableLog: false,
    version: {
      phase: 1,
      release: 0,
      build: 0,
    },
    staleTime: 1000 * 15,

    baseUrl: "https://temp-ai-server.adaptable.app/v1/api/",

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
export const config = environments.STAGING; //test

/**
 * debug log for response api
 */
export const devToolConfig: DevToolConfigModel = {
  delayFetching: 0, // delay fetch data from server
};
