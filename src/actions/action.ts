import querystring from "querystring";
import config from "../config";

export default function action(
  type: string,
  host: string,
  path: string,
  params = {},
  transform?: (value: any) => any,
) {
  return (dispatch: Function) => {
    const url = `${host}/${path}?${typeof params === "string" ? params.substring(1) : querystring.stringify(params)}`;
    const getDataStart = () => ({
      type: `REQUEST/${type}`,
    });
    const getDataOk = (payload: any) => ({
      type: `OK/${type}`,
      payload,
    });
    const getError = (error: string | number) => ({
      type: `ERROR/${type}`,
      error,
    });
    const fetchDataWithRetry = async (delay: number) => {
      try {
        const response = await fetch(
          url,
          url.startsWith(config.VITE_API_HOST)
            ? { credentials: "include" }
            : {},
        );
        if (!response.ok || !response.status) {
          const err: any = new Error();
          err.fetchError = true;
          dispatch(getError(response.status));
          if (response.status >= 400 && response.status < 500) {
            err.clientError = true;
            err.message = "fetch failed - client error";
          } else {
            err.message = "fetch failed - retrying";
          }
          throw err;
        }
        const json = await response.json();
        const transformedJson = transform ? await transform(json) : json;
        return dispatch(getDataOk(transformedJson));
      } catch (e: any) {
        // eslint-disable-next-line no-console
        console.error(e);
        if (e.fetchError && !e.clientError) {
          setTimeout(() => fetchDataWithRetry(delay + 3000), delay);
        }
        if (!e.fetchError) {
          throw e;
        }
      }
    };
    dispatch(getDataStart());
    return fetchDataWithRetry(1000);
  };
}
