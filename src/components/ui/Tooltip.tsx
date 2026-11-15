import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Tooltip.module.css";

export type TooltipProps = {
  title?: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  arrow?: boolean;
  enterDelay?: number;
  describeChild?: boolean;
  children: React.ReactElement;
  slotProps?: {
    tooltip?: { sx?: Record<string, any>; style?: React.CSSProperties; className?: string };
    [key: string]: any;
  };
  className?: string;
};

export const Tooltip: React.FC<TooltipProps> = ({
  title,
  placement = "top",
  children,
  slotProps,
  className,
}) => {
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null,
  );
  const triggerRef = useRef<HTMLElement>(null);

  if (!title && title !== 0) {
    return children;
  }

  const show = (el: HTMLElement | null) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const gap = 8;
    if (placement === "bottom") {
      setCoords({ top: rect.bottom + gap, left: rect.left + rect.width / 2 });
    } else if (placement === "left") {
      setCoords({ top: rect.top + rect.height / 2, left: rect.left - gap });
    } else if (placement === "right") {
      setCoords({ top: rect.top + rect.height / 2, left: rect.right + gap });
    } else {
      setCoords({ top: rect.top - gap, left: rect.left + rect.width / 2 });
    }
  };

  const hide = () => setCoords(null);

  const placementClass =
    placement === "bottom"
      ? styles.tooltipBottom
      : placement === "left"
        ? styles.tooltipLeft
        : placement === "right"
          ? styles.tooltipRight
          : "";

  const cloned = React.cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      children.props.onMouseEnter?.(e);
      show(e.currentTarget);
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      children.props.onMouseLeave?.(e);
      hide();
    },
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      children.props.onFocus?.(e);
      show(e.currentTarget);
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      children.props.onBlur?.(e);
      hide();
    },
  });

  const tooltipCustomStyle = slotProps?.tooltip?.style;

  return (
    <>
      {cloned}
      {coords &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="tooltip"
            className={`${styles.tooltip}${placementClass ? ` ${placementClass}` : ""}${className ? ` ${className}` : ""}`}
            style={{ top: coords.top, left: coords.left, ...tooltipCustomStyle }}
          >
            {title}
          </div>,
          document.body,
        )}
    </>
  );
};
