import React from 'react';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import { APP_NAME } from 'config';

import AppLogo from './AppLogo';

describe('AppLogo tests', () => {
  it('should render the app name inside of a <Link>', () => {
    const ShallowAppLogo = shallow(<AppLogo />);
    const AppLogoLink = ShallowAppLogo.find(Link);
    expect(AppLogoLink).to.exist;
    expect(AppLogoLink.html()).to.contain(APP_NAME);
  });
});
