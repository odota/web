import React from "react";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { createStore } from "redux";
import Draft from "./Draft";
import strings from "../../../lang/en-US.json";
import { match5293089497 } from "./draftFixtures";

// Fake store with only what the component reads (the UI strings), instead
// of the real store that loads data from the API.
const fakeStore = createStore(() => ({ app: { strings } }));

// Reads what the page shows for each step, e.g. "bD" = ban by dire.
const renderedPattern = (container: HTMLElement) =>
  Array.from(container.querySelectorAll("tr.draft-row"))
    .map((row) => {
      const label = row.textContent || "";
      const isPick = /Pick \d+/.test(label);
      const isRadiant = row.classList.contains("radiant");
      return (isPick ? "P" : "b") + (isRadiant ? "R" : "D");
    })
    .join(" ");

describe("Draft", () => {
  // Bug-revealing test: the current Draft.tsx decides the team of each step
  // from a hardcoded per-patch table, so after a skipped ban every later step
  // can be given to the wrong team. it.fails passes as long as the bug is
  // there; change it to it() once Draft.tsx uses buildDraft.
  it.fails("shows the right team for every step of match 5293089497 (#2647)", () => {
    const { container } = render(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <Draft
            gameMode={match5293089497.game_mode}
            draft={match5293089497.draft_timings}
            startTime={match5293089497.start_time}
            radiantTeam={{}}
            direTeam={{}}
          />
        </MemoryRouter>
      </Provider>,
    );
    expect(renderedPattern(container)).toBe(match5293089497.expectedPattern);
  });
});
