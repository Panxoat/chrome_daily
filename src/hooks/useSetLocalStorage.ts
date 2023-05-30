import { useEffect, useMemo } from "react";

interface UseLocalStorageProps<T> {
  key: string;
  data: T;
  defaultData: T;
}

export const useSetLocalStorage = <T extends any>({
  key,
  data,
  defaultData,
}: UseLocalStorageProps<T>) => {
  useEffect(() => {
    const setItem = () => {
      if (key && data) {
        window.localStorage.setItem(key, JSON.stringify(data) as any);
      }
    };

    window.addEventListener("beforeunload", setItem);

    return () => {
      window.removeEventListener("beforeunload", setItem);
      setItem();
    };
  }, [key, data]);
};
