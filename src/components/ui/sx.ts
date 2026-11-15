import type React from "react";

export type SxProps = Record<string, any>;

const spacing = (val: number | string) =>
  typeof val === "number" ? `${val * 8}px` : val;

/** Converts common MUI `sx` shorthand keys to inline `CSSProperties`. */
export const sxToStyle = (sx?: SxProps): React.CSSProperties | undefined => {
  if (!sx) return undefined;
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(sx)) {
    if (v === undefined || v === null || typeof v === "object") continue;
    switch (k) {
      case "m":
        out.margin = spacing(v);
        break;
      case "mt":
        out.marginTop = spacing(v);
        break;
      case "mr":
        out.marginRight = spacing(v);
        break;
      case "mb":
        out.marginBottom = spacing(v);
        break;
      case "ml":
        out.marginLeft = spacing(v);
        break;
      case "mx":
        out.marginLeft = spacing(v);
        out.marginRight = spacing(v);
        break;
      case "my":
        out.marginTop = spacing(v);
        out.marginBottom = spacing(v);
        break;
      case "p":
        out.padding = spacing(v);
        break;
      case "pt":
        out.paddingTop = spacing(v);
        break;
      case "pr":
        out.paddingRight = spacing(v);
        break;
      case "pb":
        out.paddingBottom = spacing(v);
        break;
      case "pl":
        out.paddingLeft = spacing(v);
        break;
      case "px":
        out.paddingLeft = spacing(v);
        out.paddingRight = spacing(v);
        break;
      case "py":
        out.paddingTop = spacing(v);
        out.paddingBottom = spacing(v);
        break;
      case "bgcolor":
        out.backgroundColor = v;
        break;
      default:
        out[k] = v;
    }
  }
  return out as React.CSSProperties;
};
