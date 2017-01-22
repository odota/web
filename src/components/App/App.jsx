import React from 'react';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Helmet from 'react-helmet';
import palette from 'components/palette.css';
// For some reason, if reducers are not imported here, the app doesn't work
import 'reducers';
import strings from 'lang';
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
  inkBar: {
    backgroundColor: palette.blue,
  },
  palette: {
    textColor: palette.textColorPrimary,
    primary1Color: palette.blue,
    canvasColor: palette.primarySurfaceColor,
    borderColor: palette.dividerColor,
  },
  tabs: {
    backgroundColor: palette.primarySurfaceColor,
    textColor: palette.textColorPrimary,
    selectedTextColor: palette.textColorPrimary,
  },
  button: { height: 38 },
};

const App = ({ children, open, params, location, width, localization }) => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme, muiTheme)}>
    <div
      className={
        `${open ? styles.drawerOpen : styles.drawerClosed}
        ${styles.container}
        ${location.pathname === '/' && styles.HomeBackground}`
      }
    >
      <Helmet
        htmlAttributes={{ lang: localization }}
        defaultTitle={strings.title_default}
        titleTemplate={strings.title_template}
      />
      <Header params={params} location={location} />
      <div className={styles.body}>
        {children}
      </div>
      <Footer location={location} width={width} />
    </div>
  </MuiThemeProvider>
);

const mapStateToProps = state => ({
  localization: state.app.localization,
});

export default connect(mapStateToProps)(App);
