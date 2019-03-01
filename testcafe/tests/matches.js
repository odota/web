import {
  Selector,
} from 'testcafe';
import {
  fixtureBeforeHook,
  fixtureBeforeEachHook,
  fixtureAfterHook,
  fixtureRequestHooks,
  host,
} from './../testsUtility';

const pathSuffixes = [
  'overview',
  'benchmarks',
  'draft',
  'performances',
  'laning',
  'combat',
  'farm',
  'purchases',
  'graphs',
  'casts',
  'objectives',
  'vision',
  'actions',
  'teamfights',
  'analysis',
  'cosmetics',
  'log',
  'fantasy',
  'chat',
  'story',
];


fixture`matches/ paths`
  .requestHooks(fixtureRequestHooks)
  .before(fixtureBeforeHook)
  .beforeEach(fixtureBeforeEachHook)
  .after(fixtureAfterHook);

pathSuffixes.forEach((suffix) => {
  test
    .page`${host}/matches/4080856812/${suffix}`(suffix, async (t) => {
    await t.hover(Selector('#root'));
  });
});

fixture`matches/ paths (legacy)`
  .requestHooks(fixtureRequestHooks)
  .before(fixtureBeforeHook)
  .beforeEach(fixtureBeforeEachHook)
  .after(fixtureAfterHook);

pathSuffixes.forEach((suffix) => {
  test
    .page`${host}/matches/2472899185/${suffix}`(suffix, async (t) => {
    await t.hover(Selector('#root'));
  });
});