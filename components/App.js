import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default ({ children }) => (
  <div className="container">
    <Header />
    {children}
    <Footer />
  </div>
);
