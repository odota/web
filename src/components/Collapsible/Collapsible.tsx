import React from "react";
import Transition from "react-transition-group/Transition";
import { IconPlusSquare, IconMinusSquare } from "../Icons";
import useStrings from "../../hooks/useStrings.hook";
import styles from "./Collapsible.module.css";

const CollapseButton = ({
  handleClick,
  collapsed,
  buttonStyle,
  handleHoverOn,
  handleHoverOff,
}: {
  handleClick: React.MouseEventHandler<HTMLDivElement>;
  collapsed: boolean;
  buttonStyle: React.CSSProperties;
  handleHoverOn: React.MouseEventHandler<HTMLDivElement>;
  handleHoverOff: React.MouseEventHandler<HTMLDivElement>;
}) => {
  const strings = useStrings();
  return (
    <div
      className={styles.buttonContainer}
      style={buttonStyle}
      onClick={handleClick}
      onMouseEnter={handleHoverOn}
      onMouseLeave={handleHoverOff}
    >
      {collapsed
        ? [<span>{strings.general_show}</span>, <IconPlusSquare />]
        : [<span>{strings.general_hide}</span>, <IconMinusSquare />]}
    </div>
  );
};

class Collapsible extends React.Component<
  {
    name: string;
    children: React.ReactNode;
    initialMaxHeight?: number;
    buttonStyle?: any;
  },
  { collapsed: boolean; hovered: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      collapsed: localStorage.getItem(`${props.name}Collapsed`) === "true",
      hovered: false,
    };
  }

  handleClick = () => {
    const { collapsed } = this.state;
    localStorage.setItem(`${this.props.name}Collapsed`, `${!collapsed}`);
    this.setState({ collapsed: !collapsed });
  };

  handleHoverOn = () => {
    this.setState({ hovered: true });
  };

  handleHoverOff = () => {
    this.setState({ hovered: false });
  };

  render() {
    const { collapsed, hovered } = this.state;
    const { initialMaxHeight, buttonStyle } = this.props;

    return (
      <div
        className={styles.collapsibleContainer}
        style={{
          border:
            !collapsed && hovered
              ? "1px dashed rgba(255, 255, 255, 0.1)"
              : undefined,
        }}
      >
        <CollapseButton
          handleClick={this.handleClick}
          collapsed={collapsed}
          buttonStyle={buttonStyle}
          handleHoverOn={this.handleHoverOn}
          handleHoverOff={this.handleHoverOff}
        />
        <Transition
          in={!collapsed}
          timeout={{ enter: 0, exit: 300 }}
          mountOnEnter
        >
          {(status) => (
            <div
              style={{
                transition: "max-height 300ms ease-in-out",
                overflow: "hidden",
                maxHeight:
                  status === "entered" ? initialMaxHeight || "100%" : 0,
              }}
            >
              {this.props.children}
            </div>
          )}
        </Transition>
      </div>
    );
  }
}

export default Collapsible;
