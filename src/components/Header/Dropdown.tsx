import React from "react";
import { Menu, MenuItem, Popover } from "@mui/material";

type DropdownProps = {
  Button: Function;
  buttonProps: any;
  className: string;
  children: React.ReactNode;
};

class Dropdown extends React.Component<DropdownProps> {
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
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
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
