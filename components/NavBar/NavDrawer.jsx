import React from 'react';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import Drawer from 'material-ui/Drawer';
import { REDUCER_KEY } from '../../reducers';
import styles from './NavDrawer.css';
import { openMenu } from '../../actions';

const NavDrawer = ({ open, openMenu }) => (
  <Drawer open={open} docked={false} onRequestChange={openMenu}>
    <div className={styles.container}>
      <div className={styles.navigation}>
        <NavBar />
      </div>
    </div>
  </Drawer>
);

const mapStateToProps = (state) => ({
  open: state[REDUCER_KEY].appBar.open,
});

export default connect(mapStateToProps, { openMenu })(NavDrawer);
