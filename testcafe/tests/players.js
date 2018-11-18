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
  '/players/101695162/overview',
  '/players/101695162/matches',
  '/players/101695162/heroes',
  '/players/101695162/peers',
  '/players/101695162/pros',
  '/players/101695162/records',
  '/players/101695162/totals',
  '/players/101695162/counts',
  '/players/101695162/histograms/kills',
  '/players/101695162/trends/kills',
  '/players/101695162/wardmap',
  '/players/101695162/wordcloud',
  '/players/101695162/mmr',
  '/players/101695162/rankings',
  '/players/101695162/activity',
];

fixture`players/ paths`
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
