import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const useQueryParam = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams);

      if (value.length !== 0) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      return params.toString();
    },
    [searchParams]
  );

  return {
    searchParams,
    router,
    pathname,
    createQueryString,
  };
};

export default useQueryParam;
