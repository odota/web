import React from "react";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import DraftSequence from "./DraftSequence";
import strings from "../../../lang/en-US.json";
import {
  randomedMatch,
  turboMatch,
  completeMatch,
} from "./draftSequenceFixtures";

const fakeStore = createStore(() => ({ app: { strings } }));

const pickedHeroes = (match: any) => {
  const { container } = render(
    <Provider store={fakeStore}>
      <DraftSequence match={match} />
    </Provider>,
  );
  return Array.from(container.querySelectorAll("ol.picks li")).map(
    (li) => li.getAttribute("aria-label") || "",
  );
};

describe("DraftSequence", () => {
  it("lists every hero played, randomed ones included (#2765)", () => {
    for (const match of [randomedMatch, turboMatch, completeMatch]) {
      expect(pickedHeroes(match)).toHaveLength(match.players.length);
    }
  });

  it("marks a randomed hero missing from picks_bans", () => {
    expect(pickedHeroes(randomedMatch)).toContain("Randomed: Necrophos");
  });

  it("leaves a draft with every hero in picks_bans as it was", () => {
    const labels = pickedHeroes(completeMatch);
    expect(labels.every((label) => /^\d+\. Pick: /.test(label))).toBe(true);
  });
});
