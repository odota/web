import { useSelector } from "react-redux";

export const useStrings = (): Strings => {
  //@ts-expect-error
  const strings = useSelector((state) => state.app.strings);
  return strings;
};

export default useStrings;
