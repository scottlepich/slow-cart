import { useState, useEffect } from "react";

const useDebounce = (value: number, delay = 0.5e3) => {
  const [debouncedValue, setDebouncedValue] = useState<number>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
