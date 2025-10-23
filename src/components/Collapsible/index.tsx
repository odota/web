import React from 'react';
import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';
import { IconPlusSquare, IconMinusSquare } from '../Icons';
import constants from '../constants';
import useStrings from '../../hooks/useStrings.hook';

const ButtonContainer = styled.div`
  position: absolute;
  right: -4px;
  top: 5px;
  z-index: 100;
  cursor: pointer;
  opacity: 0.4;
  color: ${constants.colorBlue};

  &:hover {
    opacity: 1;
  }

  svg {
    height: 19px;
    fill: ${constants.colorBlue};
  }

  span {
    font-size: 11px;
    vertical-align: text-top;
    text-transform: uppercase;
  }
`;

const CollapseButton = ({
  handleClick,
  collapsed,
  buttonStyle,
  handleHoverOn,
  handleHoverOff,
}: {
  handleClick: React.MouseEventHandler<HTMLDivElement>,
  collapsed: boolean,
  buttonStyle: any,
  handleHoverOn: React.MouseEventHandler<HTMLDivElement>,
  handleHoverOff: React.MouseEventHandler<HTMLDivElement>,
}) => {
  const strings = useStrings();
  return <ButtonContainer
    style={buttonStyle}
    onClick={handleClick}
    onMouseEnter={handleHoverOn}
    onMouseLeave={handleHoverOff}
  >
    {collapsed
      ? [<span>{strings.general_show}</span>, <IconPlusSquare />]
      : [<span>{strings.general_hide}</span>, <IconMinusSquare />]}
  </ButtonContainer>;
};

const CollapsibleContainer = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid transparent;
  box-sizing: border-box;
`;

class Collapsible extends React.Component<{ name: string, children: React.ReactNode, initialMaxHeight?: number, buttonStyle?: any}, { collapsed: boolean, hovered: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {
      collapsed: localStorage.getItem(`${props.name}Collapsed`) === 'true',
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
      <CollapsibleContainer
        style={{
          border:
            (!collapsed && hovered) ? '1px dashed rgba(255, 255, 255, 0.1)' : undefined,
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
                transition: 'max-height 300ms ease-in-out',
                overflow: 'hidden',
                maxHeight:
                  status === 'entered' ? initialMaxHeight || '100%' : 0,
              }}
            >
              {this.props.children}
            </div>
          )}
        </Transition>
      </CollapsibleContainer>
    );
  }
}

export default Collapsible;
