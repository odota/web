import React from 'react';
import { storiesOf } from '@storybook/react';

import Error from '../components/Error';
import ErrorBox from '../components/Error/ErrorBox';

storiesOf('Error')
  .add('Default error component', () => (
    <Error />
  ))
  .add('Error with text', () => (
    <Error text="Error with text" />
  ))
  .add('Error box', () => (
    <ErrorBox />
  ))
  .add('Error box with text', () => (
    <ErrorBox text="Error box with text" />
  ));
