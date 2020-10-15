import styled from 'styled-components';
import React from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import ActionSearch from 'material-ui/svg-icons/action/search';

const StyledHorizontalMenuFilter = styled.div`
  display: flex;
  align-items: center;

  .reset-button {
    display: inline-block;
    font-size: 22px;
    opacity: 0.5;
    cursor: pointer;
    margin-left: 10px;

    &:hover {
      opacity: 1;
    }
  }
`;

const HorizontalMenuFilter = ({
  handleChange,
  value,
  setInputRef,
  reset,
  filterText,
}) => (
  <StyledHorizontalMenuFilter>
    <ActionSearch style={{ marginRight: 6, opacity: '.6' }} />
    <TextField
      ref={setInputRef}
      hintText={filterText}
      value={value}
      onChange={handleChange}
      style={{ width: 150 }}
    />
    <div
      className="reset-button"
      onClick={reset}
      onKeyPress={reset}
      role="button"
      tabIndex="0"
    >
      x
    </div>
  </StyledHorizontalMenuFilter>
);

HorizontalMenuFilter.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.number,
  setInputRef: PropTypes.func,
  reset: PropTypes.func,
  filterText: PropTypes.string,
};

export const StyledHeroHorizontalMenu = styled.div`
  width: 100%;
  overflow-x: scroll;
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.27);
  padding: 3px;
  min-height: 76px;
  margin-top: 15px;
`;

class HorizontalMenu extends React.Component {
  inputRef = null;

  horizontalMenuRef = null;

  static propTypes = {
    filterAndRenderElements: PropTypes.func,
    filterText: PropTypes.string,
    strings: PropTypes.shape({}),
  };

  state = {
    searchValue: '',
  };

  onWheel = (e) => { // eslint-disable-line react/sort-comp
    e.preventDefault();
    this.horizontalMenuRef.scrollLeft += e.deltaY;
  }

  componentDidMount() {
    this.horizontalMenuRef.addEventListener('wheel', this.onWheel);
  }

  componentWillUnmount() {
    this.horizontalMenuRef.removeEventListener('wheel', this.onWheel);
  }

  setInputRef = (input) => {
    this.inputRef = input;
  };

  sethorizontalMenuRef = (node) => {
    this.horizontalMenuRef = node;
  };

  resetSearchValue = () => {
    if (this.state.searchValue.length > 0) {
      this.inputRef.focus();
    }
    this.setState({ searchValue: '' });
  };

  handleChange = e => this.setState({ searchValue: e.target.value });

  render() {
    return (
      <React.Fragment>
        <StyledHeroHorizontalMenu ref={this.sethorizontalMenuRef}>
          {this.props.filterAndRenderElements(
            this.state.searchValue,
            this.resetSearchValue,
          )}
        </StyledHeroHorizontalMenu>
        <HorizontalMenuFilter
          handleChange={this.handleChange}
          value={this.state.searchValue}
          reset={this.resetSearchValue}
          setInputRef={this.setInputRef}
          filterText={this.props.filterText}
        />
      </React.Fragment>
    );
  }
}

export default HorizontalMenu;
