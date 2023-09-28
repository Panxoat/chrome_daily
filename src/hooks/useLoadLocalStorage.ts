"use client";

import { useEffect, useState } from "react";

interface UseLocalStorageProps {
  key: string;
}

export const useLoadLocalStorage = <T>({ key }: UseLocalStorageProps) => {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const localStorageData = window.localStorage.getItem(key);

    setData(localStorageData ? (JSON.parse(localStorageData) as T) : null);
  }, []);

  return data;
};
