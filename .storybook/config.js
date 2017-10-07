import { configure } from '@storybook/react';

function loadStories() {
  require('../src/stories/index.jsx');
}

configure(loadStories, module);
