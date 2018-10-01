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


const paths = [
  '/matches/4080856812/overview',
  '/matches/4080856812/benchmarks',
  '/matches/4080856812/draft',
  '/matches/4080856812/performances',
  '/matches/4080856812/laning',
  '/matches/4080856812/combat',
  '/matches/4080856812/farm',
  '/matches/4080856812/items',
  '/matches/4080856812/graphs',
  '/matches/4080856812/casts',
  '/matches/4080856812/objectives',
  '/matches/4080856812/vision',
  '/matches/4080856812/actions',
  '/matches/4080856812/teamfights',
  '/matches/4080856812/analysis',
  '/matches/4080856812/cosmetics',
  '/matches/4080856812/log',
  '/matches/4080856812/fantasy',
  '/matches/4080856812/chat',
  '/matches/4080856812/story',
];

fixture`matches/ paths`
  .requestHooks(fixtureRequestHooks)
  .before(fixtureBeforeHook)
  .beforeEach(fixtureBeforeEachHook)
  .after(fixtureAfterHook);

paths.forEach((p) => {
  test
    .page`${host}${p}`(p, async (t) => {
    await t.hover(Selector('#root'));
  });
});


const legacy = [
  '/matches/2472899185/overview',
  '/matches/2472899185/benchmarks',
  '/matches/2472899185/draft',
  '/matches/2472899185/performances',
  '/matches/2472899185/laning',
  '/matches/2472899185/combat',
  '/matches/2472899185/farm',
  '/matches/2472899185/items',
  '/matches/2472899185/graphs',
  '/matches/2472899185/casts',
  '/matches/2472899185/objectives',
  '/matches/2472899185/vision',
  '/matches/2472899185/actions',
  '/matches/2472899185/teamfights',
  '/matches/2472899185/analysis',
  '/matches/2472899185/cosmetics',
  '/matches/2472899185/log',
  '/matches/2472899185/fantasy',
  '/matches/2472899185/chat',
  '/matches/2472899185/story',
];

fixture`matches/ paths (legacy)`
  .requestHooks(fixtureRequestHooks)
  .before(fixtureBeforeHook)
  .beforeEach(fixtureBeforeEachHook)
  .after(fixtureAfterHook);

legacy.forEach((p) => {
  test
    .page`${host}${p}`(p, async (t) => {
    await t.hover(Selector('#root'));
  });
});