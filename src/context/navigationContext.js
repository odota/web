import { createContext } from 'react';

const navigationContext = createContext({
  navbarPages: [],
  drawerPages: [],
});

export default navigationContext;
