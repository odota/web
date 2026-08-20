import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    if (url) {
      let ignore = false;
      const fetchData = async () => {
        const response = await fetch(url);
        const json = await response.json();
        if (!ignore) {
          setData(json);
        }
      };
      void fetchData();
      return () => {
        ignore = true;
      };
    }
  }, [url]);
  return data;
}
