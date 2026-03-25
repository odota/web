import { Theme } from "../styles/createTheme.js";
declare const memoTheme: (styleFn: (props: {
  theme: Theme;
}) => import("@mui/styled-engine").CSSInterpolation) => (props: {
  theme: Theme;
}) => string | number | boolean | import("@mui/styled-engine").ComponentSelector | import("@mui/styled-engine").Keyframes | import("@mui/styled-engine").SerializedStyles | import("@mui/styled-engine").CSSObject | import("@mui/styled-engine").ArrayCSSInterpolation | null;
export default memoTheme;