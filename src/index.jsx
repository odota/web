import React from 'react';
import { render } from 'react-dom';
import RouterWithProvider from 'components/Router';

// Import global CSS
import 'c3/c3.css';
import './index.css';

const reactElement = document.getElementById('react');
render(<RouterWithProvider />, reactElement);
