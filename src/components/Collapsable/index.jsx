import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { IconPlusSquare, IconMinusSquare } from '../Icons';

const ButtonContainer = styled.div`
    position: absolute;
    right: -4px;
    top: 5px;
    z-index: 100;

    svg {
      width: 20px;
      fill: white;
      cursor: pointer;
      opacity: 0.15;

      &:hover {
        transform: scale(1.3);
        opacity: 1;
      }
    }

    span {
      font-size: 11px;
      vertical-align: text-top;
      opacity: 0.15;
    }
`;

const CollapseButton = ({
  handleClick, collapsed, strings, buttonStyle, handleHoverOn, handleHoverOff,
}) => (
  <ButtonContainer style={buttonStyle}>
    {collapsed ?
    [<span>{strings.show_more}</span>,
      <IconPlusSquare onClick={handleClick} onMouseEnter={handleHoverOn} onMouseLeave={handleHoverOff} />]
    :
    [<span>{strings.show_less}</span>,
      <IconMinusSquare onClick={handleClick} onMouseEnter={handleHoverOn} onMouseLeave={handleHoverOff} />]}
  </ButtonContainer>
);

CollapseButton.propTypes = {
  handleClick: PropTypes.func,
  collapsed: PropTypes.bool,
  strings: PropTypes.shape({}),
  buttonStyle: PropTypes.shape({}),
  handleHoverOn: PropTypes.func,
  handleHoverOff: PropTypes.func,
};

const CollapsableContainer = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid transparent;
  box-sizing: border-box;
`;

class Collapsable extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.node),
    strings: PropTypes.shape({}),
    initialMaxHeight: PropTypes.number,
    buttonStyle: PropTypes.shape({}),
  }

  constructor(props) {
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
  }

  handleHoverOn = () => {
    this.setState({ hovered: true });
  }

  handleHoverOff = () => {
    this.setState({ hovered: false });
  }

  render() {
    const { collapsed, hovered } = this.state;
    const { initialMaxHeight, strings, buttonStyle } = this.props;

    return (
      <CollapsableContainer style={{ border: !collapsed && hovered && '1px dashed rgba(255, 255, 255, 0.1)' }}>
        <CollapseButton
          handleClick={this.handleClick}
          collapsed={collapsed}
          strings={strings}
          buttonStyle={buttonStyle}
          handleHoverOn={this.handleHoverOn}
          handleHoverOff={this.handleHoverOff}
        />
        <div style={{
          transition: 'max-height 300ms ease-in-out',
          overflow: 'hidden',
          maxHeight: collapsed ? 0 : (initialMaxHeight || '100%'),
        }}
        >
          {this.props.children}
        </div>
      </CollapsableContainer>
    );
  }
}

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Collapsable);
