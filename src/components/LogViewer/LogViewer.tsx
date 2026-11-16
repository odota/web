import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import styles from "./LogViewer.module.css";

interface LogViewerProps {
  url: string;
  enabled?: boolean;
  enableSearch?: boolean;
  onLoad?: () => void;
}

interface LogLine {
  num: number;
  raw: string;
  plain: string;
}

interface AnsiSpan {
  text: string;
  style?: React.CSSProperties;
}

const MAX_LINES = 5000;
const ESTIMATED_ROW_HEIGHT = 18;
const OVERSCAN_PX = 240;

const ANSI_16_FG: Record<number, string> = {
  30: "#1e293b",
  31: "#f87171",
  32: "#4ade80",
  33: "#facc15",
  34: "#60a5fa",
  35: "#c084fc",
  36: "#22d3ee",
  37: "#e2e8f0",
  90: "#64748b",
  91: "#fca5a5",
  92: "#86efac",
  93: "#fde047",
  94: "#93c5fd",
  95: "#d8b4fe",
  96: "#67e8f9",
  97: "#ffffff",
};

const ANSI_16_BG: Record<number, string> = {
  40: "#0f172a",
  41: "#7f1d1d",
  42: "#14532d",
  43: "#713f12",
  44: "#1e3a8a",
  45: "#581c87",
  46: "#164e63",
  47: "#cbd5e1",
  100: "#334155",
  101: "#b91c1c",
  102: "#15803d",
  103: "#a16207",
  104: "#1d4ed8",
  105: "#7e22ce",
  106: "#0e7490",
  107: "#f8fafc",
};

const ansi256ToCss = (n: number): string => {
  if (n < 16) {
    const code = n < 8 ? 30 + n : 90 + (n - 8);
    return ANSI_16_FG[code] || "#e2e8f0";
  }
  if (n < 232) {
    const idx = n - 16;
    const r = Math.floor(idx / 36);
    const g = Math.floor((idx % 36) / 6);
    const b = idx % 6;
    const map = [0, 95, 135, 175, 215, 255];
    return `rgb(${map[r]}, ${map[g]}, ${map[b]})`;
  }
  const gray = 8 + (n - 232) * 10;
  return `rgb(${gray}, ${gray}, ${gray})`;
};

const ANSI_REGEX = /\x1b\[([0-9;]*)m|\x1b\[[0-9;]*[A-Za-z]/g;

const stripAnsi = (input: string): string => input.replace(ANSI_REGEX, "");

const parseAnsi = (input: string): AnsiSpan[] => {
  const spans: AnsiSpan[] = [];
  let state: React.CSSProperties = {};
  let lastIndex = 0;
  ANSI_REGEX.lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = ANSI_REGEX.exec(input)) !== null) {
    if (match.index > lastIndex) {
      const text = input.slice(lastIndex, match.index);
      spans.push(Object.keys(state).length ? { text, style: { ...state } } : { text });
    }
    lastIndex = ANSI_REGEX.lastIndex;

    if (match[1] === undefined) continue;
    const codes = match[1] === "" ? [0] : match[1].split(";").map((c) => Number(c) || 0);
    for (let i = 0; i < codes.length; i += 1) {
      const code = codes[i];
      if (code === 0) {
        state = {};
      } else if (code === 1) {
        state = { ...state, fontWeight: 700 };
      } else if (code === 2) {
        state = { ...state, opacity: 0.7 };
      } else if (code === 3) {
        state = { ...state, fontStyle: "italic" };
      } else if (code === 4) {
        state = { ...state, textDecoration: "underline" };
      } else if (code === 22) {
        const { fontWeight: _fw, opacity: _op, ...rest } = state;
        state = rest;
      } else if (code === 23) {
        const { fontStyle: _fs, ...rest } = state;
        state = rest;
      } else if (code === 24) {
        const { textDecoration: _td, ...rest } = state;
        state = rest;
      } else if (code === 39) {
        const { color: _c, ...rest } = state;
        state = rest;
      } else if (code === 49) {
        const { backgroundColor: _bg, ...rest } = state;
        state = rest;
      } else if (ANSI_16_FG[code]) {
        state = { ...state, color: ANSI_16_FG[code] };
      } else if (ANSI_16_BG[code]) {
        state = { ...state, backgroundColor: ANSI_16_BG[code] };
      } else if ((code === 38 || code === 48) && i + 1 < codes.length) {
        const prop = code === 38 ? "color" : "backgroundColor";
        if (codes[i + 1] === 5 && i + 2 < codes.length) {
          state = { ...state, [prop]: ansi256ToCss(codes[i + 2]) };
          i += 2;
        } else if (codes[i + 1] === 2 && i + 4 < codes.length) {
          state = { ...state, [prop]: `rgb(${codes[i + 2]}, ${codes[i + 3]}, ${codes[i + 4]})` };
          i += 4;
        }
      }
    }
  }

  if (lastIndex < input.length) {
    const text = input.slice(lastIndex);
    spans.push(Object.keys(state).length ? { text, style: { ...state } } : { text });
  }
  return spans;
};

const lowerBound = (offsets: number[], target: number): number => {
  let lo = 0;
  let hi = offsets.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (offsets[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
};

const LogViewer: React.FC<LogViewerProps> = ({
  url,
  enabled = true,
  enableSearch = false,
  onLoad,
}) => {
  const [lines, setLines] = useState<LogLine[]>([]);
  const [search, setSearch] = useState("");
  const [follow, setFollow] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(300);
  const [measureVersion, setMeasureVersion] = useState(0);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const heightsRef = useRef<Map<number, number>>(new Map());
  const nextLineNumRef = useRef(1);
  const onLoadRef = useRef(onLoad);
  onLoadRef.current = onLoad;

  useEffect(() => {
    if (!enabled || !url) return;
    setLines([]);
    heightsRef.current.clear();
    nextLineNumRef.current = 1;
    const es = new EventSource(url);
    es.onmessage = (event) => {
      const incoming = String(event.data ?? "").split(/\r?\n/);
      setLines((prev) => {
        const mapped: LogLine[] = incoming.map((raw) => {
          const num = nextLineNumRef.current++;
          return { num, raw, plain: stripAnsi(raw) };
        });
        const next = prev.concat(mapped);
        if (next.length > MAX_LINES) {
          const dropCount = next.length - MAX_LINES;
          for (let i = 0; i < dropCount; i += 1) {
            heightsRef.current.delete(next[i].num);
          }
          return next.slice(dropCount);
        }
        return next;
      });
    };
    es.onerror = () => {
      if (es.readyState === EventSource.CLOSED) {
        onLoadRef.current?.();
      }
    };
    return () => {
      es.close();
    };
  }, [url, enabled]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setViewportHeight(el.clientHeight || 300);
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setViewportHeight(entry.contentRect.height);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const visibleLines = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return lines;
    return lines.filter((item) => item.plain.toLowerCase().includes(q));
  }, [lines, search]);

  const { offsets, totalHeight } = useMemo(() => {
    const offs = new Array<number>(visibleLines.length + 1);
    offs[0] = 0;
    for (let i = 0; i < visibleLines.length; i += 1) {
      const h = heightsRef.current.get(visibleLines[i].num) ?? ESTIMATED_ROW_HEIGHT;
      offs[i + 1] = offs[i] + h;
    }
    return { offsets: offs, totalHeight: offs[visibleLines.length] };
  }, [visibleLines, measureVersion]);

  const { startIdx, endIdx, topPad, bottomPad } = useMemo(() => {
    if (visibleLines.length === 0) {
      return { startIdx: 0, endIdx: 0, topPad: 0, bottomPad: 0 };
    }
    const minTop = Math.max(0, scrollTop - OVERSCAN_PX);
    const maxBottom = scrollTop + viewportHeight + OVERSCAN_PX;
    const rawStart = Math.max(0, lowerBound(offsets, minTop) - 1);
    const rawEnd = Math.min(visibleLines.length, lowerBound(offsets, maxBottom) + 1);
    return {
      startIdx: rawStart,
      endIdx: rawEnd,
      topPad: offsets[rawStart],
      bottomPad: Math.max(0, totalHeight - offsets[rawEnd]),
    };
  }, [visibleLines.length, offsets, totalHeight, scrollTop, viewportHeight]);

  const measureRow = useCallback((num: number, el: HTMLDivElement | null) => {
    if (!el) return;
    const h = el.getBoundingClientRect().height;
    if (h > 0 && Math.abs((heightsRef.current.get(num) ?? ESTIMATED_ROW_HEIGHT) - h) > 0.5) {
      heightsRef.current.set(num, h);
      setMeasureVersion((v) => v + 1);
    }
  }, []);

  useLayoutEffect(() => {
    if (follow && scrollerRef.current) {
      const el = scrollerRef.current;
      el.scrollTop = el.scrollHeight;
      setScrollTop(el.scrollTop);
    }
  }, [visibleLines, follow, measureVersion]);

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setScrollTop(el.scrollTop);
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight <= 4;
    setFollow(atBottom);
  };

  const windowLines = visibleLines.slice(startIdx, endIdx);

  return (
    <div className={styles.container}>
      {enableSearch && (
        <div className={styles.toolbar}>
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Filter logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Filter logs"
          />
          <button
            type="button"
            className={`${styles.followBtn} ${follow ? styles.followBtnActive : ""}`}
            onClick={() => {
              setFollow(true);
              if (scrollerRef.current) {
                scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
              }
            }}
          >
            Follow
          </button>
        </div>
      )}
      <div ref={scrollerRef} className={styles.scroller} onScroll={handleScroll}>
        {topPad > 0 && <div style={{ height: topPad }} aria-hidden="true" />}
        {windowLines.map((line) => (
          <div
            key={line.num}
            ref={(el) => measureRow(line.num, el)}
            className={styles.line}
          >
            <span className={styles.lineNumber}>{line.num}</span>
            <span className={styles.lineText}>
              {parseAnsi(line.raw).map((span, idx) =>
                span.style ? (
                  <span key={idx} style={span.style}>
                    {span.text}
                  </span>
                ) : (
                  span.text
                ),
              )}
            </span>
          </div>
        ))}
        {bottomPad > 0 && <div style={{ height: bottomPad }} aria-hidden="true" />}
      </div>
    </div>
  );
};

export default LogViewer;
