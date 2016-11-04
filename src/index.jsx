import React from 'react';
import { render } from 'react-dom';
import RouterWithProvider from 'components/Router';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Import global CSS
import 'c3/c3.css';
import 'components/tooltip.css';
import './index.css';

// TODO this is used by material-ui, but we should remove when possible.
injectTapEventPlugin();
const reactElement = document.getElementById('react');
render(<RouterWithProvider />, reactElement);
