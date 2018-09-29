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
  '/matches/4080856812/combat',
  '/matches/4080856812/farm',
  '/matches/4080856812/items',
  '/matches/4080856812/graphs',
  '/matches/4080856812/objectives',
  '/matches/4080856812/actions',
  '/matches/4080856812/analysis',
  '/matches/4080856812/cosmetics',
  '/matches/4080856812/fantasy',
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

test
  .page`${host}/matches/4080856812/vision`('/matches/4080856812/vision', async (t) => {
  const checkboxes = Selector('.vision-filter').find('input');
  const checkboxCount = await checkboxes.count;
  for (let i = 0; i < checkboxCount; i++) {
    await t
      .click(checkboxes.nth(i))
      .wait(100)
      .click(checkboxes.nth(i));
  }
});

test
  .page`${host}/matches/4080856812/laning`('/matches/4080856812/laning', async (t) => {
  const checkboxes = Selector('.innerContainer').find('input');
  const checkboxCount = await checkboxes.count;
  for (let i = 0; i < checkboxCount; i++) {
    await t
      .click(checkboxes.nth(i))
      .wait(100);
  }
});

test
  .page`${host}/matches/4080856812/teamfights`('/matches/4080856812/teamfights', async (t) => {
  const svgs = Selector('.events').find('svg');
  const svgCount = await svgs.count;
  for (let i = 0; i < svgCount; i++) {
    await t
      .click(svgs.nth(i))
      .wait(100);
  }
});

test
  .page`${host}/matches/4080856812/chat`('/matches/4080856812/chat', async (t) => {
  const filters = Selector('.Filters').find('input');
  const filtersCount = await filters.count;
  for (let i = 0; i < filtersCount; i++) {
    await t
      .click(filters.nth(i))
      .wait(100)
      .click(filters.nth(i));
  }
});
