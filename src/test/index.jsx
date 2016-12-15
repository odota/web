import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export const testPropTypes = (Component, props) => {
  describe('Props test', () => {
    before(() => {
      sinon.stub(console, 'error', (warning) => { throw new Error(warning); });
    });
    // While not forgetting to restore it afterwards
    after(() => { console.error.restore(); });

    it('should not fail PropTypes validation', () => {
      shallow(<Component {...props} />);
    });
  });
};

export const withMuiTheme = Component =>
  props => (
    <MuiThemeProvider>
      <Component {...props} />
    </MuiThemeProvider>
  );

export const shallowWithMui = (Component) => {
  const context = { muiTheme: getMuiTheme() };
  const ShallowComponent = shallow(Component, { context });
  // ShallowComponent.setContext(context);
  console.log(ShallowComponent.context());
  return ShallowComponent;
};
