import { useSelector } from 'react-redux';

export const useStrings = () => {
  const strings = useSelector((state) => state.app.strings);
  return strings;
};

export default useStrings;
