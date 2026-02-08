import { DistributiveOmit } from '@mui/types';
import { StyledComponentProps } from "../styles/index.js";
/**
 * @internal
 * ONLY USE FROM WITHIN mui/material-ui
 *
 * Internal helper type for conform (describeConformance) components
 * However, we don't declare classes on this type.
 * It is recommended to declare them manually with an interface so that each class can have a separate JSDoc.
 */
export type InternalStandardProps<ComponentProps, Removals extends keyof ComponentProps = never> = DistributiveOmit<ComponentProps, 'classes' | Removals> & StyledComponentProps<never> & {
  ref?: ComponentProps extends {
    ref?: infer RefType;
  } ? RefType : React.Ref<unknown>;
  className?: string;
  style?: React.CSSProperties;
};