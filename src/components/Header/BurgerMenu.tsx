import React from "react";
import { Drawer, Menu, MenuItem, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./BurgerMenu.module.css";

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
        <Drawer
          className={styles.drawer}
          open={this.state.open}
          onChange={(open) => this.setState({ open })}
        >
          <Menu open={this.state.open}>
            {this.props.menuItems.map((item) => {
              const linkElement = React.cloneElement(item, {
                style: { width: "100%", display: "block" },
              });
              return (
                <MenuItem className={styles.menuItem} key={item.key} onClick={this.handleClose}>
                  {linkElement}
                </MenuItem>
              );
            })}
          </Menu>
        </Drawer>
      </div>
    );
  }
}
