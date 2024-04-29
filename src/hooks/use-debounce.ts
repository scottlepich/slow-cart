import { useRef } from "react";

type DebouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void;

const useDebounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
): DebouncedFunction<T> => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFn: DebouncedFunction<T> = (...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };

  return debouncedFn;
};

export default useDebounce;
