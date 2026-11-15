import React, { useRef } from "react";
import styles from "./Slider.module.css";
import { sxToStyle, type SxProps } from "./sx";

export type SliderProps = {
  value?: number | number[];
  min?: number;
  max?: number;
  step?: number;
  marks?: boolean | { value: number; label?: React.ReactNode }[];
  onChange?: (event: any, value: any) => void;
  onChangeCommitted?: (event: any, value: any) => void;
  valueLabelDisplay?: "on" | "auto" | "off";
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
  [key: string]: any;
};

export const Slider: React.FC<SliderProps> = ({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  marks,
  onChange,
  onChangeCommitted,
  disabled,
  className,
  style,
  sx,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const isRange = Array.isArray(value);
  const vals = isRange ? value : [value];
  const span = Math.max(1, max - min);
  const pct = (v: number) => Math.min(100, Math.max(0, ((v - min) / span) * 100));

  const valueFromClientX = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return min;
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const raw = min + ratio * span;
    const stepped = Math.round((raw - min) / step) * step + min;
    return Math.min(max, Math.max(min, stepped));
  };

  const startDrag = (thumbIdx: number, e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    const onMove = (ev: MouseEvent) => {
      const nextVal = valueFromClientX(ev.clientX);
      if (isRange) {
        const next = [...vals];
        next[thumbIdx] = nextVal;
        next.sort((a, b) => a - b);
        onChange?.(ev, next);
      } else {
        onChange?.(ev, nextVal);
      }
    };
    const onUp = (ev: MouseEvent) => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      const nextVal = valueFromClientX(ev.clientX);
      if (isRange) {
        const next = [...vals];
        next[thumbIdx] = nextVal;
        next.sort((a, b) => a - b);
        onChangeCommitted?.(ev, next);
      } else {
        onChangeCommitted?.(ev, nextVal);
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const leftPct = isRange ? pct(vals[0]) : 0;
  const widthPct = isRange ? pct(vals[1]) - pct(vals[0]) : pct(vals[0]);

  return (
    <div
      className={`${styles.root}${className ? ` ${className}` : ""}`}
      style={{ ...sxToStyle(sx), ...style }}
    >
      <div
        ref={trackRef}
        className={styles.trackContainer}
        onMouseDown={(e) => {
          if (disabled) return;
          const clicked = valueFromClientX(e.clientX);
          if (isRange) {
            const d0 = Math.abs(clicked - vals[0]);
            const d1 = Math.abs(clicked - vals[1]);
            const idx = d0 <= d1 ? 0 : 1;
            const next = [...vals];
            next[idx] = clicked;
            next.sort((a, b) => a - b);
            onChange?.(e, next);
            startDrag(idx, e);
          } else {
            onChange?.(e, clicked);
            startDrag(0, e);
          }
        }}
      >
        <div
          className={styles.trackActive}
          style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
        />
        {vals.map((v, idx) => (
          <div
            key={idx}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={v}
            className={styles.thumb}
            style={{ left: `${pct(v)}%` }}
            onMouseDown={(e) => {
              e.stopPropagation();
              startDrag(idx, e);
            }}
          />
        ))}
        {Array.isArray(marks) &&
          marks.map((m) =>
            m.label !== undefined ? (
              <span
                key={m.value}
                className={styles.markLabel}
                style={{ left: `${pct(m.value)}%` }}
              >
                {m.label}
              </span>
            ) : null,
          )}
      </div>
    </div>
  );
};
