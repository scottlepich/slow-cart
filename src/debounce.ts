// TODO cancel earlier requests

const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  ms: number,
): ((...args: Parameters<T>) => ReturnType<T>) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export default debounce;
