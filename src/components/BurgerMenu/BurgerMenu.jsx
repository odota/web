import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import styles from './BurgerMenu.css';

export default class BurgerMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  handleClose() {
    this.setState({open: false});
  }


  render() {
    return (
      <div>
        <IconButton onTouchTap={this.handleToggle.bind(this)} style={{ left:0, margin:0 }}>
          <MenuIcon />
        </IconButton>
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem style={{ backgroundColor: '#1976d2' }}>{this.props.top}</MenuItem>
          {
            this.props.links.map(page => (
              <MenuItem>
                <a href={page.path} className={styles.tab}>{page.name}</a>
              </MenuItem>
            ))
          }
        </Drawer>
      </div>
    );
  }
}
