import React from 'react';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { REDUCER_KEY } from 'reducers';
import palette from 'components/palette.css';
import Header from '../Header';
import Footer from '../Footer';
import styles from './App.css';

const muiTheme = {
  fontFamily: palette.fontFamily,
  card: { fontWeight: palette.fontWeightNormal },
  badge: { fontWeight: palette.fontWeightNormal },
  subheader: { fontWeight: palette.fontWeightNormal },
  raisedButton: { fontWeight: palette.fontWeightNormal },
  flatButton: { fontWeight: palette.fontWeightNormal }, // color: 'background color'
  palette: {
    textColor: palette.textColorPrimary,
    primary1Color: palette.blue,
  },
};

const App = ({ children, open, params, location }) => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme, muiTheme)}>
    <div className={`${open ? styles.drawerOpen : styles.drawerClosed} ${styles.container}`}>
      <Header params={params} location={location} />
      <div className={styles.body}>
        {children}
      </div>
      <Footer />
    </div>
  </MuiThemeProvider>
);

const mapStateToProps = (state) => ({
  open: state[REDUCER_KEY].appBar.open,
});

export default connect(mapStateToProps)(App);
