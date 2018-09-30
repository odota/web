import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconPlusSquare, IconMinusSquare } from '../Icons';


const ButtonContainer = styled.div`
    position: absolute;
    right: 0;
    cursor: pointer;
    opacity: 0.15;

    :hover {
      transform: scale(1.3);
      opacity: 1;
    }

    svg {
      width: 20px;
      fill: white;
    }
`;

const CollapseButton = ({ handleClick, collapsed }) => (
  <ButtonContainer onClick={handleClick}>
    {collapsed ? <IconPlusSquare /> : <IconMinusSquare />}
  </ButtonContainer>
);

CollapseButton.propTypes = {
  handleClick: PropTypes.func,
  collapsed: PropTypes.bool,
};

const CollapsableContainer = styled.div`
  position: relative;
  width: 100%;
`;

class Collapsable extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node,
  }

  constructor(props) {
    super(props);
    this.state = {
      collapsed: localStorage.getItem(`${props.name}Collapsed`) === 'true',
    };
  }

  handleClick = () => {
    const { collapsed } = this.state;
    localStorage.setItem(`${this.props.name}Collapsed`, `${!collapsed}`);
    this.setState({ collapsed: !collapsed });
  }

  render() {
    const { collapsed } = this.state;
    return (
      <CollapsableContainer>
        <CollapseButton handleClick={this.handleClick} collapsed={collapsed} />
        {!collapsed && this.props.children}
      </CollapsableContainer>
    );
  }
}

export default Collapsable;
