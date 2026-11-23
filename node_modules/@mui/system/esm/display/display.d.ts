import { PropsFor, SimpleStyleFunction } from "../style/index.js";
declare const display: SimpleStyleFunction<'display' | 'displayPrint' | 'overflow' | 'textOverflow' | 'visibility' | 'whiteSpace'>;
export type DisplayProps = PropsFor<typeof display>;
export default display;