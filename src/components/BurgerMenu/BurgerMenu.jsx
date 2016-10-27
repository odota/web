import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import styles from './BurgerMenu.css';

export default class BurgerMenu extends React.Component {

  constructor() {
    super();
    this.state = { open: false };
    this.handleToggle = () => this.setState({ open: !this.state.open });
    this.handleClose = () => this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <IconButton onTouchTap={this.handleToggle}>
          <MenuIcon />
        </IconButton>
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
          className={styles.drawer}
        >
          <MenuItem
            style={{
              backgroundColor: styles.blue,
              textAlign: 'left',
              height: '54px',
            }}
          >{this.props.top}</MenuItem>
          {
            this.props.links.map(page => (
              <MenuItem href={page.path} primaryText={page.name} />
            ))
          }
        </Drawer>
      </div>
    );
  }
}
