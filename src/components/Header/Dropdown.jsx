import React, { Component } from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';

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
    return (
      <div className={className}>
        <Button onTouchTap={this.handleTouchTap} {...buttonProps} />
        <Popover
          autoCloseWhenOffScreen={false}
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
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
