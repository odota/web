import { PropsFor, SimpleStyleFunction } from "../style/index.js";
export const color: SimpleStyleFunction<'color'>;
export const bgcolor: SimpleStyleFunction<'bgcolor'>;
declare const palette: SimpleStyleFunction<'bgcolor' | 'color'>;
export type PaletteProps = PropsFor<typeof palette>;
export default palette;