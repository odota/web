import React, { Component } from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import classNames from 'classnames';
import styles from './Dropdown.css';

class Dropdown extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap(event) {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  render() {
    const { Button, buttonProps, className, children } = this.props;
    const { open } = this.state;
    return (
      <div className={className}>
        <Button
          onTouchTap={this.handleTouchTap}
          className={classNames(styles.dropButton, open && styles.open)}
          {...buttonProps}
        />
        <Popover
          autoCloseWhenOffScreen={false}
          open={open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
          className={styles.popoverContainer}
        >
          <Menu>
            {React.Children.map(children, child => (
              <MenuItem>
                {child}
              </MenuItem>
            ))}
          </Menu>
        </Popover>
      </div>
    );
  }
}

export default Dropdown;
