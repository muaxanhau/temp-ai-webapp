import { DefaultValues, FieldValues, Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  useIsFetching,
  useIsMutating,
  useQueryClient,
} from "@tanstack/react-query";
import { z } from "zod";
import { resetAllStores, useAuthStore } from "@/stores";
import { auth } from "@/repositories";
import { usePathname, useRouter } from "next/navigation";

// export const usePushNotification = () => {
//   const getDeviceId = () => {
//     const token = getToken(messaging, {
//       vapidKey:
//         "BKuvWDrXYyiVPd0fdCBZLmXT81ErRvgF-qI53AxtG7-9OqDMnAQEyb9rbTAMxLvlrTQ80XNw7ZGf8-iul2L-MlI",
//     });
//     return token;
//   };
//   const requestPermission = async () => {
//     const permission = await Notification.requestPermission();
//     console.log(permission);
//   };

//   return {
//     getDeviceId,
//     requestPermission,
//   };
// };

export const useFirstSetupApp = () => {
  const { setToken } = useAuthStore();
  const router = useRouter();
  // const { requestPermission } = usePushNotification();

  const checkAuth = async () => {
    const isAuthorized = auth.currentUser !== null;

    if (!isAuthorized) {
      router.replace("/login");
      return;
    }

    router.replace("/app/chat");
    const token = await auth.currentUser?.getIdToken();
    setToken(token);
  };

  useLayoutEffect(() => {
    // not work? bug from  lib?
    // auth.onIdTokenChanged(async (user) => {
    //   if (!user) {
    //     resetAllStores();
    //     queryClient.clear();
    //     return;
    //   }
    //   const token = await user.getIdToken();
    //   setStore({ token });
    // });
  }, []);

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  useEffect(() => {
    // requestPermission();
    // onMessage(messaging, (payload) => {
    //   console.log("==========================================");
    //   console.log("received push notification");
    //   console.log("Message received. ", payload);
    // });
  }, []);
};

export const useAppNetwork = (): "online" | "offline" => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline ? "online" : "offline";
};

type UseHookFormProps<T> = {
  schema: z.Schema<T>;
  defaultValues?: DefaultValues<T>;
};
export const useHookForm = <T extends FieldValues>({
  schema,
  defaultValues,
}: UseHookFormProps<T>) => {
  const { setValue, getValues, ...rest } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const checkAllFieldsHaveNoDataYet = () => {
    const data = getValues();
    const allEmpty = !Object.entries(data).filter(
      ([, value]) => value !== undefined
    ).length;
    return allEmpty;
  };
  const setDefaultValues = (data?: Partial<T>) => {
    if (!data) return;
    const noDataYet = checkAllFieldsHaveNoDataYet();
    if (!noDataYet) return;

    // just can be setDefaultValues when all field are empty
    const values = Object.entries(data).filter(
      ([, value]) => value !== undefined
    );

    values.forEach(([field, value]) => {
      setValue(field as Path<T>, value);
    });
  };

  return { setValue, getValues, setDefaultValues, ...rest };
};

export const useTimeout = (callback: () => void, delay: number) => {
  const refCallback = useRef<() => void>(callback);
  const refTimeout = useRef<NodeJS.Timeout>();

  const set = useCallback(() => {
    refTimeout.current = setTimeout(() => refCallback.current(), delay);
  }, [delay]);
  const clear = useCallback(() => {
    refTimeout.current && clearTimeout(refTimeout.current);
  }, []);
  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  useEffect(() => {
    refCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    set();

    return clear;
  }, []);

  return { reset, clear };
};

export const useDebounce = (
  callback: () => void,
  delay: number,
  deps?: React.DependencyList
) => {
  const { clear, reset } = useTimeout(callback, delay);

  useEffect(reset, [JSON.stringify(deps), reset]);
  useEffect(clear, []);
};

/**
 *
 * @param value initial value
 * @returns curr state, prev state, setState method
 */
export const usePreviousState = <T>(value: T): [T, T, (state: T) => void] => {
  const [currState, setCurrState] = useState<T>(value);
  const refPrevState = useRef<T>(value);

  const setState = (state: T) => {
    refPrevState.current = currState;
    setCurrState(state);
  };

  return [currState, refPrevState.current, setState];
};

/**
 * detect when fetch api/firebase
 * @returns isLoading
 */
export const useIsLoading = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isLoading = !!isFetching || !!isMutating;

  return isLoading;
};

export const useCanGoBack = () => {
  const pathname = usePathname();
  const [] = useState<string[]>([]);

  // useEffect(() => {
  //   console.log("================= change history");
  //   console.log(pathname);
  // }, [pathname]);

  const canGoBack = pathname !== "/" && pathname !== "/login";
  return canGoBack;
};
