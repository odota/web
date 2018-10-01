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

const CollapseButton = ({ handleClick, collapsed, strings }) => (
  <ButtonContainer>
    {collapsed ?
    [<span>{strings.show_more}</span>, <IconPlusSquare onClick={handleClick} />]
    :
    [<span>{strings.show_less}</span>, <IconMinusSquare onClick={handleClick} />]
    }
  </ButtonContainer>
);

CollapseButton.propTypes = {
  handleClick: PropTypes.func,
  collapsed: PropTypes.bool,
  strings: PropTypes.shape({}),
};

const CollapsableContainer = styled.div`
  position: relative;
  width: 100%;
`;

class Collapsable extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.node),
    strings: PropTypes.shape({}),
    initialMaxHeight: PropTypes.number,
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
    const { initialMaxHeight, strings } = this.props;

    return (
      <CollapsableContainer>
        <CollapseButton handleClick={this.handleClick} collapsed={collapsed} strings={strings} />
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
