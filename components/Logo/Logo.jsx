import React from 'react';
import { Link } from 'react-router';

export default () => (
  <div className="navbar-header">
    <Link to="/" className="navbar-brand">
      <strong className="theme-blue">YASP</strong>
      <div data-toggle="collapse" data-target=".navbar-collapse" className="navbar-toggle">
        <span className="icon-bar" />
        <span className="icon-bar" />
        <span className="icon-bar" />
      </div>
    </Link>
  </div>
);
