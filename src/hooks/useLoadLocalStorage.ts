import { useEffect, useMemo } from "react";

interface UseLocalStorageProps {
  key: string;
}

export const useLoadLocalStorage = <T>({ key }: UseLocalStorageProps) => {
  const localStorageData = window.localStorage.getItem(key);

  return localStorageData ? (JSON.parse(localStorageData) as T) : null;
};
