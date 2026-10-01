import { Selector } from "testcafe";
import {
  fixtureBeforeHook,
  fixtureBeforeEachHook,
  fixtureAfterHook,
  fixtureRequestHooks,
  host,
} from "./../testsUtility";

const paths = [
  "/explorer?minDate=2018-08-01T13%3A03%3A40.498Z",
  "/meta",
  "/matches/pro",
  "/matches/highMmr",
  "/teams",
  "/heroes/pro",
  "/heroes/public",
  "/distributions",
  "/records/duration",
  "/records/kills",
  "/records/deaths",
  "/records/assists",
  "/records/xp_per_min",
  "/records/last_hits",
  "/records/denies",
  "/records/hero_damage",
  "/records/tower_damage",
  "/records/hero_healing",
  "/combos?teamA=2&teamB=3",
];

fixture`home/ paths`
  .requestHooks(fixtureRequestHooks)
  // The app fires requests the hooks do not serve and those rejections are
  // not what these tests are about. Skipping only those leaves every other
  // js error fatal, so a page that throws while rendering fails the run.
  .skipJsErrors({ message: /Failed to fetch/ })
  .before(fixtureBeforeHook)
  .beforeEach(fixtureBeforeEachHook)
  .after(fixtureAfterHook);

paths.forEach((p) => {
  test.page(`${host}${p}`)(p, async (t) => {
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
