import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from './App.css';
import { connect } from 'react-redux';
import { REDUCER_KEY } from '../../reducers';

const App = ({ children, open }) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div className={`${open ? styles.drawerOpen : styles.drawerClosed} ${styles.container}`}>
      <Header />
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
