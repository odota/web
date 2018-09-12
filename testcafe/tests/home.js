import {
  Selector,
} from 'testcafe';
import {
  ReactSelector,
} from 'testcafe-react-selectors';
import {
  fixtureBeforeHook,
  fixtureBeforeEachHook,
  fixtureAfterHook,
  fixtureRequestHooks,
  host,
} from './../testsUtility';

const paths = [
  '/explorer?minDate=2018-08-01T13%3A03%3A40.498Z',
  '/meta',
  '/matches/pro',
  '/matches/highMmr',
  '/teams',
  '/heroes/pro',
  '/heroes/public',
  '/distributions',
  '/records/duration',
  '/records/kills',
  '/records/deaths',
  '/records/assists',
  '/records/xp_per_min',
  '/records/last_hits',
  '/records/denies',
  '/records/hero_damage',
  '/records/tower_damage',
  '/records/hero_healing',
];

fixture`home/ paths`
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

test
  .page`${host}`('home loads', async (t) => {
  await t;
});

test
  .page`${host}`('click explorer menu item', async (t) => {
  const explorerLink = ReactSelector('Link').withProps({
    to: '/explorer',
  });
  await t
    .click(explorerLink);
});

test
  .page`${host}`('burger menu appears on resize, opens and closes correctly', async (t) => {
  await t.resizeWindow(300, 500);

  const burgerMenu = ReactSelector('BurgerMenu');
  await t
    .expect(burgerMenu.getReact(({
      state,
    }) => state.open)).eql(false);
  await t
    .click(burgerMenu)
    .expect(burgerMenu.getReact(({
      state,
    }) => state.open)).eql(true);
  await t
    .click(burgerMenu, {
      offsetX: 275,
    })
    .expect(burgerMenu.getReact(({
      state,
    }) => state.open)).eql(false);

  await t.maximizeWindow();
});
