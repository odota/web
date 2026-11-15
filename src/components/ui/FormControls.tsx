import React, { createContext, useContext } from "react";
import styles from "./FormControls.module.css";
import { sxToStyle, type SxProps } from "./sx";

type RadioGroupCtx = {
  name?: string;
  value?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
};

const RadioGroupContext = createContext<RadioGroupCtx | null>(null);

export type SwitchProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type" | "onChange"
> & {
  size?: "small" | "medium";
  color?: string;
  sx?: SxProps;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
};

export const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked,
  disabled,
  size: _size,
  className,
  style,
  sx,
  onChange,
  ...props
}) => {
  const [internal, setInternal] = React.useState(Boolean(defaultChecked));
  const isChecked = checked !== undefined ? checked : internal;
  return (
    <span
      className={`${styles.switchRoot}${isChecked ? ` ${styles.switchChecked}` : ""}${className ? ` ${className}` : ""}`}
      style={{ ...sxToStyle(sx), ...style }}
    >
      <input
        type="checkbox"
        role="switch"
        checked={isChecked}
        disabled={disabled}
        className={styles.hiddenInput}
        onChange={(e) => {
          if (checked === undefined) setInternal(e.target.checked);
          onChange?.(e, e.target.checked);
        }}
        {...props}
      />
      <span className={styles.switchTrack} />
      <span className={styles.switchThumb} />
    </span>
  );
};

export type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type" | "onChange"
> & {
  size?: "small" | "medium";
  color?: string;
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
  sx?: SxProps;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  defaultChecked,
  disabled,
  size: _size,
  icon,
  checkedIcon,
  className,
  style,
  sx,
  onChange,
  ...props
}) => {
  const [internal, setInternal] = React.useState(Boolean(defaultChecked));
  const isChecked = checked !== undefined ? checked : internal;
  return (
    <span
      className={`${styles.checkboxRoot}${isChecked ? ` ${styles.checkboxChecked}` : ""}${className ? ` ${className}` : ""}`}
      style={{ ...sxToStyle(sx), ...style }}
    >
      <input
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        className={styles.hiddenInput}
        onChange={(e) => {
          if (checked === undefined) setInternal(e.target.checked);
          onChange?.(e, e.target.checked);
        }}
        {...props}
      />
      {icon || checkedIcon ? (
        isChecked ? (checkedIcon ?? icon) : (icon ?? checkedIcon)
      ) : (
        <span className={styles.checkboxBox} aria-hidden="true">
          {isChecked && (
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
              <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          )}
        </span>
      )}
    </span>
  );
};

export type RadioProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> & {
  size?: "small" | "medium";
  color?: string;
  sx?: SxProps;
};

export const Radio: React.FC<RadioProps> = ({
  checked,
  value,
  name,
  disabled,
  size: _size,
  className,
  style,
  sx,
  onChange,
  ...props
}) => {
  const group = useContext(RadioGroupContext);
  const isChecked =
    checked !== undefined
      ? checked
      : group
        ? String(group.value) === String(value)
        : false;
  return (
    <span
      className={`${styles.radioRoot}${isChecked ? ` ${styles.radioChecked}` : ""}${className ? ` ${className}` : ""}`}
      style={{ ...sxToStyle(sx), ...style }}
    >
      <input
        type="radio"
        name={name ?? group?.name}
        value={value}
        checked={isChecked}
        disabled={disabled}
        className={styles.hiddenInput}
        onChange={(e) => {
          onChange?.(e);
          group?.onChange?.(e, e.target.value);
        }}
        {...props}
      />
      <span className={styles.radioCircle} aria-hidden="true">
        {isChecked && <span className={styles.radioDot} />}
      </span>
    </span>
  );
};

export type RadioGroupProps = {
  name?: string;
  value?: any;
  defaultValue?: any;
  row?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  defaultValue,
  row,
  onChange,
  children,
  className,
  style,
  sx,
}) => {
  const [internal, setInternal] = React.useState(defaultValue);
  const current = value !== undefined ? value : internal;
  return (
    <RadioGroupContext.Provider
      value={{
        name,
        value: current,
        onChange: (e, val) => {
          if (value === undefined) setInternal(val);
          onChange?.(e, val);
        },
      }}
    >
      <div
        role="radiogroup"
        className={`${styles.radioGroup}${row ? ` ${styles.radioGroupRow}` : ""}${className ? ` ${className}` : ""}`}
        style={{ ...sxToStyle(sx), ...style }}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};

export type FormControlLabelProps = {
  control: React.ReactElement;
  label: React.ReactNode;
  value?: any;
  disabled?: boolean;
  labelPlacement?: "end" | "start" | "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
};

export const FormControlLabel: React.FC<FormControlLabelProps> = ({
  control,
  label,
  value,
  disabled,
  className,
  style,
  sx,
}) => {
  const cloned =
    value !== undefined || disabled !== undefined
      ? React.cloneElement(control, {
          ...(value !== undefined ? { value } : {}),
          ...(disabled !== undefined ? { disabled } : {}),
        })
      : control;
  return (
    <label
      className={`${styles.controlLabel}${disabled ? ` ${styles.controlLabelDisabled}` : ""}${className ? ` ${className}` : ""}`}
      style={{ ...sxToStyle(sx), ...style }}
    >
      {cloned}
      <span>{label}</span>
    </label>
  );
};
