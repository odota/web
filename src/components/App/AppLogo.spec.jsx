import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import { APP_NAME } from '../../config';

import AppLogo from './AppLogo';

describe('AppLogo tests', () => {
  it('should render the app name inside of a <big> inside of a <Link>', () => {
    const ShallowAppLogo = shallow(<AppLogo refresh={mockRefresh} />);
    expect(ShallowAppLogo.find(Link)).to.exist;
  });
});
