import React from "react";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { createStore } from "redux";
import Draft from "./Draft";
import strings from "../../../lang/en-US.json";
import { match5293089497 } from "./draftFixtures";

const fakeStore = createStore(() => ({ app: { strings } }));

const renderedPattern = (container: HTMLElement) =>
  Array.from(container.querySelectorAll("tr.draft-row"))
    .map((row) => {
      const label = row.textContent || "";
      const isPick = /Pick \d+/.test(label);
      const isRadiant = row.classList.contains("radiant");
      return (isPick ? "P" : "b") + (isRadiant ? "R" : "D");
    })
    .join(" ");

const renderDraft = (props: Partial<React.ComponentProps<typeof Draft>>) =>
  render(
    <Provider store={fakeStore}>
      <MemoryRouter>
        <Draft radiantTeam={{}} direTeam={{}} {...props} />
      </MemoryRouter>
    </Provider>,
  );

describe("Draft", () => {
  it("shows the right team for every step of match 5293089497 (#2647)", () => {
    const { container } = renderDraft({
      picksBans: match5293089497.picks_bans,
      draftTimings: match5293089497.draft_timings,
    });
    expect(renderedPattern(container)).toBe(match5293089497.expectedPattern);
  });

  it("shows time used and reserve time left", () => {
    const { container } = renderDraft({
      picksBans: [
        { order: 0, is_pick: false, team: 0, hero_id: 1 },
        { order: 1, is_pick: true, team: 0, hero_id: 2 },
      ],
      draftTimings: [
        { hero_id: 1, total_time_taken: 10, extra_time: 130 },
        { hero_id: 2, total_time_taken: 45, extra_time: 115 },
      ],
    });
    const rows = container.querySelectorAll("tr.draft-row");
    expect(rows[0].textContent).toContain("10s used");
    expect(rows[0].textContent).toContain("130s left");
    expect(rows[1].textContent).toContain("115s left (-15s)");
  });

  it("shows the draft without times when there is no draft_timings", () => {
    const { container } = renderDraft({
      picksBans: match5293089497.picks_bans,
    });
    expect(container.querySelectorAll("tr.draft-row")).toHaveLength(16);
    expect(container.textContent).not.toContain("used");
    expect(container.textContent).not.toContain("left");
  });
});
