import React from "react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Combos from "./Combos";
import strings from "../../lang/en-US.json";

const fakeStore = createStore(() => ({ app: { strings } }));

afterEach(cleanup);

const renderCombos = () =>
  render(
    <Provider store={fakeStore}>
      <Combos />
    </Provider>,
  );

const teamA = (container: HTMLElement) =>
  Array.from(container.querySelectorAll(".team-container.left img")).length;

describe("Combos keyboard access (#2832)", () => {
  it("adds a hero to a team with Enter and removes it with a button", () => {
    const { container, getByLabelText } = renderCombos();
    fireEvent.keyDown(getByLabelText("Axe team A"), { key: "Enter" });
    expect(teamA(container)).toBe(1);

    // a native button, so it is focusable and Enter/Space click it
    const remove = getByLabelText("Remove Axe from Team A");
    expect(remove.tagName).toBe("BUTTON");
    fireEvent.click(remove);
    expect(teamA(container)).toBe(0);
  });

  it("adds a hero with Space too", () => {
    const { container, getByLabelText } = renderCombos();
    fireEvent.keyDown(getByLabelText("Axe team A"), { key: " " });
    expect(teamA(container)).toBe(1);
  });

  it("ignores other keys", () => {
    const { container, getByLabelText } = renderCombos();
    fireEvent.keyDown(getByLabelText("Axe team A"), { key: "a" });
    fireEvent.keyPress(getByLabelText("Axe team A"), {
      key: "a",
      charCode: 97,
    });
    expect(teamA(container)).toBe(0);
  });

  it("takes picked and filtered-out heroes out of the tab order", () => {
    const { getByLabelText, getByPlaceholderText } = renderCombos();
    fireEvent.keyDown(getByLabelText("Axe team A"), { key: "Enter" });
    expect(getByLabelText("Axe team B").tabIndex).toBe(-1);

    fireEvent.change(getByPlaceholderText(strings.placeholder_filter_heroes), {
      target: { value: "pudge" },
    });
    expect(getByLabelText("Pudge team A").tabIndex).toBe(0);
    expect(getByLabelText("Zeus team A").tabIndex).toBe(-1);
  });
});
