import * as React from 'react';
import { DistributiveOmit } from '@mui/types';
import { StyledComponentProps } from "../styles/index.js";
/**
 * A component whose root component can be controlled via a `component` prop.
 *
 * Adjusts valid props based on the type of `component`.
 */
export interface OverridableComponent<TypeMap extends OverridableTypeMap> {
  <RootComponent extends React.ElementType>(props: {
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component: RootComponent;
  } & OverrideProps<TypeMap, RootComponent>): React.JSX.Element | null;
  (props: DefaultComponentProps<TypeMap>): React.JSX.Element | null;
}
/**
 * Props of the component if `component={Component}` is used.
 */
export type OverrideProps<TypeMap extends OverridableTypeMap, RootComponent extends React.ElementType> = (BaseProps<TypeMap> & DistributiveOmit<React.ComponentPropsWithRef<RootComponent>, keyof BaseProps<TypeMap>>);
/**
 * Props if `component={Component}` is NOT used.
 */
export type DefaultComponentProps<TypeMap extends OverridableTypeMap> = BaseProps<TypeMap> & DistributiveOmit<React.ComponentPropsWithRef<TypeMap['defaultComponent']>, keyof BaseProps<TypeMap>>;
/**
 * Props defined on the component (+ common material-ui props).
 */
export type BaseProps<TypeMap extends OverridableTypeMap> = TypeMap['props'] & CommonProps;
/**
 * Props that are valid for material-ui components.
 */
export interface CommonProps extends StyledComponentProps<never> {
  className?: string;
  style?: React.CSSProperties;
}
export interface OverridableTypeMap {
  props: {};
  defaultComponent: React.ElementType;
}