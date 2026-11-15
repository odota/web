import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Autocomplete.module.css";
import { Chip } from "./Chip";
import { sxToStyle, type SxProps } from "./sx";

export type AutocompleteProps<T = any> = {
  options: T[];
  value?: T | T[] | null;
  defaultValue?: T | T[] | null;
  multiple?: boolean;
  freeSolo?: boolean;
  disabled?: boolean;
  disableClearable?: boolean;
  disableCloseOnSelect?: boolean;
  clearOnBlur?: boolean;
  autoHighlight?: boolean;
  openOnFocus?: boolean;
  getOptionLabel?: (option: T) => string;
  isOptionEqualToValue?: (option: T, value: T) => boolean;
  filterOptions?: (options: T[], state: { inputValue: string }) => T[];
  onChange?: (event: React.SyntheticEvent, value: any, reason?: string) => void;
  onInputChange?: (
    event: React.SyntheticEvent,
    value: string,
    reason?: string,
  ) => void;
  renderInput: (params: {
    id?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    InputProps: {
      ref?: React.Ref<any>;
      startAdornment?: React.ReactNode;
      endAdornment?: React.ReactNode;
    };
    inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  }) => React.ReactNode;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: T,
    state: { selected: boolean },
  ) => React.ReactNode;
  renderTags?: (
    value: T[],
    getTagProps: (params: { index: number }) => {
      key: number;
      onDelete: () => void;
    },
  ) => React.ReactNode;
  renderValue?: (
    value: any[],
    getItemProps: (params: { index: number }) => {
      key: number;
      onDelete: () => void;
    },
  ) => React.ReactNode;
  noOptionsText?: React.ReactNode;
  size?: "small" | "medium";
  fullWidth?: boolean;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
  [key: string]: any;
};

const defaultGetLabel = (option: any): string => {
  if (option === null || option === undefined) return "";
  if (typeof option === "string" || typeof option === "number")
    return String(option);
  return String(option.label ?? option.text ?? option.name ?? option.value ?? "");
};

export function Autocomplete<T = any>({
  options,
  value: controlledValue,
  defaultValue,
  multiple = false,
  freeSolo = false,
  disabled = false,
  disableClearable = false,
  disableCloseOnSelect = false,
  getOptionLabel = defaultGetLabel,
  isOptionEqualToValue,
  filterOptions,
  onChange,
  onInputChange,
  renderInput,
  renderOption,
  renderTags,
  renderValue,
  noOptionsText = "No options",
  fullWidth,
  id,
  className,
  style,
  sx,
}: AutocompleteProps<T>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [internalValue, setInternalValue] = useState<any>(
    defaultValue ?? (multiple ? [] : null),
  );
  const currentValue =
    controlledValue !== undefined ? controlledValue : internalValue;

  const [inputValue, setInputValue] = useState(() =>
    !multiple && currentValue ? getOptionLabel(currentValue as T) : "",
  );
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    if (!multiple && controlledValue !== undefined) {
      setInputValue(
        controlledValue ? getOptionLabel(controlledValue as T) : "",
      );
    }
  }, [controlledValue, multiple, getOptionLabel]);

  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleDocClick);
    return () => document.removeEventListener("mousedown", handleDocClick);
  }, []);

  const equalFn =
    isOptionEqualToValue ||
    ((a: any, b: any) =>
      a === b ||
      (a &&
        b &&
        typeof a === "object" &&
        typeof b === "object" &&
        ((a.value !== undefined && a.value === b.value) ||
          (a.key !== undefined && a.key === b.key))));

  const filtered = useMemo(() => {
    if (filterOptions) {
      return filterOptions(options, { inputValue });
    }
    const q = inputValue.trim().toLowerCase();
    if (!q) return options;
    return options.filter((opt) =>
      getOptionLabel(opt).toLowerCase().includes(q),
    );
  }, [options, inputValue, filterOptions, getOptionLabel]);

  const commitValue = (next: any, event: React.SyntheticEvent, reason = "selectOption") => {
    if (controlledValue === undefined) {
      setInternalValue(next);
    }
    onChange?.(event, next, reason);
  };

  const handleSelectOption = (option: T, event: React.SyntheticEvent) => {
    if (multiple) {
      const list = Array.isArray(currentValue) ? [...currentValue] : [];
      const existsIdx = list.findIndex((item) => equalFn(item, option));
      if (existsIdx >= 0) {
        list.splice(existsIdx, 1);
      } else {
        list.push(option);
      }
      commitValue(list, event);
      setInputValue("");
      if (!disableCloseOnSelect) {
        setOpen(false);
      }
    } else {
      commitValue(option, event);
      setInputValue(getOptionLabel(option));
      setOpen(false);
    }
  };

  const selectedList = multiple && Array.isArray(currentValue) ? currentValue : [];

  const tagRenderer = renderTags || renderValue;
  const startAdornment =
    multiple && selectedList.length > 0 ? (
      <span className={styles.tagsRow}>
        {tagRenderer
          ? tagRenderer(selectedList, ({ index }) => ({
              key: index,
              onDelete: () => {
                const next = selectedList.filter((_, i) => i !== index);
                commitValue(next, {} as React.SyntheticEvent, "removeOption");
              },
            }))
          : selectedList.map((item, index) => (
              <Chip
                key={index}
                size="small"
                label={getOptionLabel(item)}
                onDelete={() => {
                  const next = selectedList.filter((_, i) => i !== index);
                  commitValue(next, {} as React.SyntheticEvent, "removeOption");
                }}
              />
            ))}
      </span>
    ) : undefined;

  const hasClearableValue = multiple
    ? selectedList.length > 0
    : Boolean(currentValue || inputValue);

  const endAdornment =
    !disableClearable && !disabled && hasClearableValue ? (
      <button
        type="button"
        aria-label="Clear"
        className={styles.clearBtn}
        onClick={(e) => {
          e.stopPropagation();
          setInputValue("");
          commitValue(multiple ? [] : null, e, "clear");
          onInputChange?.(e, "", "clear");
        }}
      >
        ×
      </button>
    ) : undefined;

  return (
    <div
      ref={rootRef}
      className={`${styles.root}${className ? ` ${className}` : ""}`}
      style={{ ...sxToStyle(sx), ...style }}
    >
      {renderInput({
        id,
        disabled,
        fullWidth,
        InputProps: {
          startAdornment,
          endAdornment,
        },
        inputProps: {
          value: inputValue,
          autoComplete: "off",
          onFocus: () => {
            if (!disabled) setOpen(true);
          },
          onChange: (e) => {
            const val = e.target.value;
            setInputValue(val);
            setOpen(true);
            setHighlightedIndex(0);
            onInputChange?.(e, val, "input");
            if (freeSolo && !multiple) {
              commitValue(val || null, e, "input");
            }
          },
          onKeyDown: (e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
              setHighlightedIndex((i) =>
                Math.min(i + 1, Math.max(0, filtered.length - 1)),
              );
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setHighlightedIndex((i) => Math.max(i - 1, 0));
            } else if (e.key === "Enter" && open) {
              if (filtered[highlightedIndex]) {
                e.preventDefault();
                handleSelectOption(filtered[highlightedIndex], e);
              } else if (freeSolo && inputValue.trim()) {
                e.preventDefault();
                if (multiple) {
                  commitValue([...selectedList, inputValue.trim()], e, "createOption");
                  setInputValue("");
                }
              }
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          },
        },
      })}
      {open && !disabled && (
        <ul className={styles.dropdown} role="listbox">
          {filtered.length === 0 ? (
            <li className={styles.noOptions}>{noOptionsText}</li>
          ) : (
            filtered.slice(0, 200).map((option, index) => {
              const isSelected = multiple
                ? selectedList.some((s) => equalFn(s, option))
                : Boolean(currentValue && equalFn(currentValue, option));
              const liProps: React.HTMLAttributes<HTMLLIElement> = {
                role: "option",
                "aria-selected": isSelected,
                className: `${styles.option}${index === highlightedIndex ? ` ${styles.optionHighlighted}` : ""}${isSelected ? ` ${styles.optionSelected}` : ""}`,
                onMouseDown: (e) => {
                  e.preventDefault();
                  handleSelectOption(option, e);
                },
                onMouseEnter: () => setHighlightedIndex(index),
              };
              if (renderOption) {
                return (
                  <React.Fragment key={index}>
                    {renderOption(liProps, option, { selected: isSelected })}
                  </React.Fragment>
                );
              }
              return (
                <li key={index} {...liProps}>
                  {getOptionLabel(option)}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}
