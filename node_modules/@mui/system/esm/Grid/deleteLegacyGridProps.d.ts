import { Breakpoint, Breakpoints } from "../createTheme/index.js";
/**
 * Deletes the legacy Grid component props from the `props` object and warns once about them if found.
 *
 * @param {object} props The props object to remove the legacy Grid props from.
 * @param {Breakpoints} breakpoints The breakpoints object.
 */
export default function deleteLegacyGridProps(props: {
  item?: boolean;
  zeroMinWidth?: boolean;
} & Partial<Record<Breakpoint, 'auto' | number | boolean>> & Record<string, any>, breakpoints: Breakpoints): void;