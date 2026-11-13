import { RadioGroupContextValue } from "./RadioGroupContext.js";
export interface RadioGroupState extends RadioGroupContextValue {}
export default function useRadioGroup(): RadioGroupState | undefined;