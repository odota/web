import styled from 'styled-components';
import React from 'react';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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
  reset,
  filterText,
}: {
  handleChange: (e: React.FormEvent) => void,
  value: string,
  reset: (e: any) => void,
  filterText: string,
}) => (
  <StyledHorizontalMenuFilter>
    <SearchIcon style={{ marginRight: 6, opacity: '.6' }} />
    <TextField
      helperText={filterText}
      value={value}
      onChange={handleChange}
      style={{ width: 150 }}
    />
    <div
      className="reset-button"
      onClick={reset}
      onKeyPress={reset}
      role="button"
      tabIndex={0}
    >
      x
    </div>
  </StyledHorizontalMenuFilter>
);

export const StyledHeroHorizontalMenu = styled.div`
  width: 100%;
  overflow-x: scroll;
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.27);
  padding: 3px;
  min-height: 76px;
  margin-top: 15px;
`;

class HorizontalMenu extends React.Component<{ filterAndRenderElements: Function, filterText: string, strings: Strings }> {
  inputRef: any = null;
  horizontalMenuRef: any = null;

  state = {
    searchValue: '',
  };

  onWheel = (e: any) => {
    // eslint-disable-line react/sort-comp
    e.preventDefault();
    if (this.horizontalMenuRef) {
      this.horizontalMenuRef.scrollLeft += e.deltaY;
    }
  };

  componentDidMount() {
    this.horizontalMenuRef?.addEventListener('wheel', this.onWheel);
  }

  componentWillUnmount() {
    this.horizontalMenuRef?.removeEventListener('wheel', this.onWheel);
  }

  sethorizontalMenuRef = (node: any) => {
    this.horizontalMenuRef = node;
  };

  resetSearchValue = () => {
    if (this.state.searchValue.length > 0) {
      this.inputRef?.focus();
    }
    this.setState({ searchValue: '' });
  };

  handleChange = (e: any) => this.setState({ searchValue: e.target.value });

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
          filterText={this.props.filterText}
        />
      </React.Fragment>
    );
  }
}

export default HorizontalMenu;
