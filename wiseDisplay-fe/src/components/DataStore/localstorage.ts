import { useState, useEffect } from "react";

// A custom hook to store and retrieve data from local storage
export function useLocalStorage(key: string, initialDefault: any) {
  const [val, setVal] = useState(() => {
    const localStorageVal = localStorage.getItem(key);
    return localStorageVal !== null ? JSON.parse(localStorageVal) : initialDefault;
  });

  useEffect(() => {
    if (localStorage.getItem(key) === null) {
      setVal(initialDefault);
    }
  }, [key, initialDefault]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(val));
  }, [val, key]);

  return [val, setVal];
}