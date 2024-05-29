// add new environment here
type EnvironmentList = "DEVELOPMENT" | "STAGING" | "PRODUCTION";
export type EnvironmentsConfigModel = Readonly<
  Record<
    EnvironmentList,
    {
      enableLog: boolean;
      version: {
        phase: number;
        release: number;
        build: number;
      };
      baseUrl: string;
      staleTime: number; // for react query
      firebase: {
        apiKey: string;
        authDomain: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
        measurementId: string;
      };
      tokenName: string;
    }
  >
>;

export type DevToolConfigModel = {
  delayFetching: number;
};
