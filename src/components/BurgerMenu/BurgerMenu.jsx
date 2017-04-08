import React from 'react';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
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
          width={260}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
          className={styles.drawer}
        >
          <Menu>
            {this.props.menuItems.map((item, index) => (
              <MenuItem className={styles.menuItem} key={index} onTouchTap={item.close && this.handleClose}>
                {item.component}
              </MenuItem>
            ))}
          </Menu>
        </Drawer>
      </div>
    );
  }
}
