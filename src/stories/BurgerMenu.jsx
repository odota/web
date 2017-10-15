import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import BurgerMenu from '../components/Header/BurgerMenu';

storiesOf('Header', module).add('Burger menu', () => {
  const menuItems = [
    <div role="button" tabIndex={0} onClick={action('Click on First item')} onKeyPress={() => {}}>First item</div>,
    <div role="button" tabIndex={-1} onClick={action('Click on Second item')} onKeyPress={() => {}}>Second item</div>,
    <div role="button" tabIndex={-1} onClick={action('Click on Third item')} onKeyPress={() => {}}>Third item</div>,
  ];

  return <BurgerMenu menuItems={menuItems} />;
});
