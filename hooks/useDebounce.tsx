import React from "react";

export function useDebounce<T>(
  value: T,
  delay: number,
  callback: (value?: T) => Promise<void> | void
) {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(async () => {
      setDebouncedValue(value);
      await callback(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
