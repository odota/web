import React from 'react';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../Header';
import Footer from '../Footer';
import styles from './App.css';
import { REDUCER_KEY } from '../../reducers';

const App = ({ children, open, params, location }) => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
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
