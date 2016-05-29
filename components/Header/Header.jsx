import React from 'react';
import Logo from '../Logo';
import NavBar from '../NavBar';
import AccountWidget from '../AccountWidget';
require('./Header.css');

export default () => (
  <nav>
    <Logo />
    <NavBar /> 
    {/* Rankings + benchmarks + pick => heroes
    remove Search link and make search form or icon that replacing all nav to search form like on apple.com? */}
    <AccountWidget /> 
    {/* add user avatar? */}
  </nav>
);
