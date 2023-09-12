import { useEffect, useState } from "react";

const useDebounce = (value: any, delay = 1000) => {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return currentValue;
};

export default useDebounce;
