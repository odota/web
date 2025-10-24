import React from 'react';
import { Drawer, Menu, MenuItem, IconButton } from '@mui/material';
//@ts-expect-error
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import styled from 'styled-components';
import constants from '../constants';

const StyledDrawer = styled(Drawer)`
  background-color: ${constants.defaultPrimaryColor} !important;
`;

const StyledMenuItem = styled(MenuItem)`
  display: block;
`;

type BurgerMenuProps = { menuItems: any[] };

export default class BurgerMenu extends React.Component<BurgerMenuProps> {
  state = { open: false };
  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });
  constructor(props: BurgerMenuProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <IconButton onClick={this.handleToggle}>
          <MenuIcon />
        </IconButton>
        <StyledDrawer
          open={this.state.open}
          onChange={(open) => this.setState({ open })}
        >
          <Menu open={this.state.open}>
            {this.props.menuItems.map((item) => {
              const linkElement = React.cloneElement(item, {
                style: { width: '100%', display: 'block' },
              });
              return (
                <StyledMenuItem key={item.key} onClick={this.handleClose}>
                  {linkElement}
                </StyledMenuItem>
              );
            })}
          </Menu>
        </StyledDrawer>
      </div>
    );
  }
}
