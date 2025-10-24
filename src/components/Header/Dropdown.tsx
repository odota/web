import React, { Component } from 'react';
import { Menu, MenuItem, Popover } from '@mui/material';
// import styled from 'styled-components';
// import constants from '../constants';

// TODO doesn't work with styled-components right now since overwriting the Button element causes material-ui to lose anchor context
/*
const StyledButton = styled(Button)`
  & svg {
    transform: rotate(${props => props.open ? '90deg' : '0deg'});
    fill: ${props => props.open ? `${constants.colorGolden} !important;` : ''}
    transition: ${constants.linearTransition};
  }
`;
*/

type DropdownProps = {
  Button: Function,
  buttonProps: any,
  className: string,
  children: React.ReactNode,
};

class Dropdown extends Component<DropdownProps> {
  state = { open: false, anchorEl: undefined };
  constructor(props: DropdownProps) {
    super(props);
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handleTouchTap = (event: any) => {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  render() {
    const { Button, buttonProps, className, children } = this.props;
    const { open } = this.state;
    return (
      <div className={className}>
        <Button onClick={this.handleTouchTap} open={open} {...buttonProps} />
        <Popover
          open={open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          // targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onClose={this.handleRequestClose}
          // className={styles.popoverContainer}
        >
          <Menu open={open}>
            {React.Children.map(children, (child) =>
              child ? <MenuItem>{child}</MenuItem> : null,
            )}
          </Menu>
        </Popover>
      </div>
    );
  }
}

export default Dropdown;
