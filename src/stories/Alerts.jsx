import React from 'react';

import { storiesOf } from '@storybook/react';

import Warning from '../components/Alerts/Warning';
import Info from '../components/Alerts/Info';

storiesOf('Alerts', module)
  .add('Warning with msg', () => <Warning msg="This is Warning" />)
  .add('Warning with DOM.Node', () => (
    <Warning>
      <span>
        <b>This is Warning</b>
      </span>
    </Warning>
  ))
  .add('Info with msg', () => <Info msg="This is Info" />)
  .add('Info with DOM.Node', () => (
    <Info>
      <span>
        <b>This is Info</b>
      </span>
    </Info>
  ));
