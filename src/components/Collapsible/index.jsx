import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';
import { connect } from 'react-redux';
import { IconPlusSquare, IconMinusSquare } from '../Icons';
import constants from '../constants';

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
  handleClick, collapsed, strings, buttonStyle, handleHoverOn, handleHoverOff,
}) => (
  <ButtonContainer style={buttonStyle} onClick={handleClick} onMouseEnter={handleHoverOn} onMouseLeave={handleHoverOff}>
    {collapsed
      ? [<span>{strings.general_show}</span>, <IconPlusSquare />]
      : [<span>{strings.general_hide}</span>, <IconMinusSquare />]}
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

const CollapsibleContainer = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid transparent;
  box-sizing: border-box;
`;

class Collapsible extends React.Component {
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
      <CollapsibleContainer style={{ border: !collapsed && hovered && '1px dashed rgba(255, 255, 255, 0.1)' }}>
        <CollapseButton
          handleClick={this.handleClick}
          collapsed={collapsed}
          strings={strings}
          buttonStyle={buttonStyle}
          handleHoverOn={this.handleHoverOn}
          handleHoverOff={this.handleHoverOff}
        />
        <Transition in={!collapsed} timeout={{ enter: 0, exit: 300 }} mountOnEnter>
          {status => (
            <div style={{
              transition: 'max-height 300ms ease-in-out',
              overflow: 'hidden',
              maxHeight: status === 'entered' ? (initialMaxHeight || '100%') : 0,
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

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Collapsible);
