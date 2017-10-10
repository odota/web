import React from 'react';
import { storiesOf } from '@storybook/react';
import Attribute, { TYPES as ATTR_TYPES } from '../components/Hero/Attribute';

storiesOf('Hero', module).add('Attributes', () => (
  <div style={{ color: 'white' }}>
    <Attribute type={ATTR_TYPES.str} base={20} gain={1.4} />
    <Attribute type={ATTR_TYPES.agi} base={15} gain={5.6} />
    <Attribute type={ATTR_TYPES.int} base={18} gain={2.1} />
  </div>
));
