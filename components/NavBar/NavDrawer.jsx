import React from 'react';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import Drawer from 'material-ui/Drawer';
import { REDUCER_KEY } from '../../reducers';

const NavDrawer = ({ open }) => (
  <Drawer open={open}>
    <NavBar />
  </Drawer>
);

const mapStateToProps = (state) => ({
  open: state[REDUCER_KEY].appBar.open,
});

export default connect(mapStateToProps)(NavDrawer);
