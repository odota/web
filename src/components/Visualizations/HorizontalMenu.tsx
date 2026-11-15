import React from "react";
import { TextField, SearchIcon } from "../ui";
import styles from "./HorizontalMenu.module.css";

const HorizontalMenuFilter = ({
  handleChange,
  value,
  reset,
  filterText,
}: {
  handleChange: (e: React.FormEvent) => void;
  value: string;
  reset: (e: any) => void;
  filterText: string;
}) => (
  <div className={styles.horizontalMenuFilter}>
    <SearchIcon style={{ marginRight: 6, opacity: ".6" }} />
    <TextField
      helperText={filterText}
      value={value}
      onChange={handleChange}
      style={{ width: 150 }}
    />
    <div
      className={styles.resetButton}
      onClick={reset}
      onKeyPress={reset}
      role="button"
      tabIndex={0}
    >
      x
    </div>
  </div>
);

export const StyledHeroHorizontalMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`${styles.heroHorizontalMenu}${className ? ` ${className}` : ""}`}
    {...props}
  />
));

class HorizontalMenu extends React.Component<{
  filterAndRenderElements: Function;
  filterText: string;
  strings: Strings;
}> {
  inputRef: any = null;
  horizontalMenuRef: any = null;

  state = {
    searchValue: "",
  };

  onWheel = (e: any) => {
    // eslint-disable-line react/sort-comp
    e.preventDefault();
    if (this.horizontalMenuRef) {
      this.horizontalMenuRef.scrollLeft += e.deltaY;
    }
  };

  componentDidMount() {
    this.horizontalMenuRef?.addEventListener("wheel", this.onWheel);
  }

  componentWillUnmount() {
    this.horizontalMenuRef?.removeEventListener("wheel", this.onWheel);
  }

  sethorizontalMenuRef = (node: any) => {
    this.horizontalMenuRef = node;
  };

  resetSearchValue = () => {
    if (this.state.searchValue.length > 0) {
      this.inputRef?.focus();
    }
    this.setState({ searchValue: "" });
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
