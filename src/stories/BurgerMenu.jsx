import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import BurgerMenu from '../components/BurgerMenu';

storiesOf('Burger menu', module).add('With items', () => {
  const menuItems = [
    {
      component: <div role="button" tabIndex={0} onClick={action('Click on First item')}>First item</div>,
      close: true,
    },
    {
      component: <div role="button" tabIndex={-1} onClick={action('Click on Second item')}>Second item</div>,
      close: true,
    },
    {
      component: <div role="button" tabIndex={-1} onClick={action('Click on Third item')}>Third item</div>,
      close: true,
    },
  ];

  return <BurgerMenu menuItems={menuItems} />;
});
