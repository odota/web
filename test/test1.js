import { ReactSelector, waitForReact } from 'testcafe-react-selectors';

fixture `home`
  .page `http://localhost:3000`
  .beforeEach(async () => {
    await waitForReact();
  });

test('home loads', async t => {
  await t
});

test('click explorer menu item', async t => {
  const explorerLink = ReactSelector('Link').withProps({ to: '/explorer' })

  await t
    .click(explorerLink)
});

test('burger menu appears on resize, opens and closes correctly', async t => {
  await t.resizeWindow(300, 500);
  
  const burgerMenu = ReactSelector('BurgerMenu');
  await t
    .expect(burgerMenu.getReact(({ state }) => state.open)).eql(false);

  await t
    .click(burgerMenu)
    .expect(burgerMenu.getReact(({ state }) => state.open)).eql(true);

  await t
    .click(burgerMenu, { offsetX: 275 })
    .expect(burgerMenu.getReact(({ state }) => state.open)).eql(false)
});
