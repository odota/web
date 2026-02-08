import type { Theme } from "../styles/index.js";
declare const getTextDecoration: <T extends Theme>({
  theme,
  ownerState
}: {
  theme: T;
  ownerState: {
    color: string;
  };
}) => string;
export default getTextDecoration;