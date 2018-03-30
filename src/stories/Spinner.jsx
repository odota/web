import React from 'react';
import { storiesOf } from '@storybook/react';

import Spinner from '../Spinner';
import constants from '../constants';

storiesOf('Spinner')
  .add('Size 20 color white', () => <Spinner size={20} color="white" />)
  .add('Size 32 color white', () => <Spinner size={32} color="white" />)
  .add('Size 50 color green', () => <Spinner size={42.5} color={constants.colorGreen} />)
  .add('Size 50 color golden', () => <Spinner size={42.5} color={constants.golden} />);
