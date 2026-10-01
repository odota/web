import { Selector } from "testcafe";
import {
  fixtureBeforeHook,
  fixtureBeforeEachHook,
  fixtureAfterHook,
  fixtureRequestHooks,
  host,
} from "./../testsUtility";

const pathSuffixes = [
  "overview",
  "benchmarks",
  "draft",
  "performances",
  "laning",
  "combat",
  "farm",
  "purchases",
  "graphs",
  "casts",
  "objectives",
  "vision",
  "actions",
  "teamfights",
  "analysis",
  "cosmetics",
  "log",
  "fantasy",
  "chat",
  "story",
];

fixture`matches/ paths`
  .requestHooks(fixtureRequestHooks)
  // The app fires requests the hooks do not serve and those rejections are
  // not what these tests are about. Skipping only those leaves every other
  // js error fatal, so a page that throws while rendering fails the run.
  .skipJsErrors({ message: /Failed to fetch/ })
  .before(fixtureBeforeHook)
  .beforeEach(fixtureBeforeEachHook)
  .after(fixtureAfterHook);

pathSuffixes.forEach((suffix) => {
  test.page(`${host}/matches/4080856812/${suffix}`)(suffix, async (t) => {
    await t.hover(Selector("#root"));
    // Give the page time to fetch and render. A component that throws while
    // rendering unmounts the tree, and #root (which lives in index.html)
    // is left empty, so this is what catches a blank page.
    await t.wait(3000);
    await t
      .expect(Selector("#root").child().exists)
      .ok("nothing rendered into #root");
  });
});

fixture`matches/ paths (legacy)`
  .requestHooks(fixtureRequestHooks)
  // The app fires requests the hooks do not serve and those rejections are
  // not what these tests are about. Skipping only those leaves every other
  // js error fatal, so a page that throws while rendering fails the run.
  .skipJsErrors({ message: /Failed to fetch/ })
  .before(fixtureBeforeHook)
  .beforeEach(fixtureBeforeEachHook)
  .after(fixtureAfterHook);

pathSuffixes.forEach((suffix) => {
  test.page(`${host}/matches/2472899185/${suffix}`)(suffix, async (t) => {
    await t.hover(Selector("#root"));
    // Give the page time to fetch and render. A component that throws while
    // rendering unmounts the tree, and #root (which lives in index.html)
    // is left empty, so this is what catches a blank page.
    await t.wait(3000);
    await t
      .expect(Selector("#root").child().exists)
      .ok("nothing rendered into #root");
  });
});
