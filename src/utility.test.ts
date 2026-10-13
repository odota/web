import { describe, expect, it } from "vitest";
import { defaultSort, SORT_ENUM } from "./utility";

describe("defaultSort", () => {
  const rows = [{ wins: 3 }, { wins: 10 }, { wins: 1 }];

  it("sorts descending by field", () => {
    const sorted = defaultSort([...rows], "desc", "wins", undefined as any);
    expect(sorted.map((r) => r.wins)).toEqual([10, 3, 1]);
  });

  it("sorts ascending by field", () => {
    const sorted = defaultSort([...rows], "asc", "wins", undefined as any);
    expect(sorted.map((r) => r.wins)).toEqual([1, 3, 10]);
  });

  it("uses sortFn when given", () => {
    const sorted = defaultSort([...rows], "desc", "wins", (r: any) => -r.wins);
    expect(sorted.map((r) => r.wins)).toEqual([1, 3, 10]);
  });
});

describe("SORT_ENUM", () => {
  it("cycles desc -> asc -> desc", () => {
    expect(SORT_ENUM.next(SORT_ENUM.desc)).toBe("asc");
    expect(SORT_ENUM.next(SORT_ENUM.asc)).toBe("desc");
  });
});
