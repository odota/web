import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import querystring from 'querystring';
import ChipList from './ChipList';
import constants from '../constants';

const { colorRed, colorBlue } = constants;

const addChipDefault = (name, input, limit, history) => {
  if (history) {
    const query = querystring.parse(window.location.search.substring(1));
    const field = [input.value].concat(query[name] || []).slice(0, limit);
    const newQuery = {
      ...query,
      [name]: field,
    };
    history.push(`${window.location.pathname}?${querystring.stringify(newQuery)}`);
  }
};

const deleteChipDefault = (name, index, history) => {
  if (history) {
    const query = querystring.parse(window.location.search.substring(1));
    const field = [].concat(query[name] || []);
    const newQuery = {
      ...query,
      [name]: [
        ...field.slice(0, index),
        ...field.slice(index + 1),
      ],
    };
    if (!newQuery[name].length) {
      delete newQuery[name];
    }
    history.push(`${window.location.pathname}?${querystring.stringify(newQuery)}`);
  }
};

class FormField extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    dataSource: PropTypes.arrayOf({}),
    strict: PropTypes.bool,
    limit: PropTypes.number,
    formSelectionState: PropTypes.shape({}),
    addChip: PropTypes.string,
    history: PropTypes.shape({}),
    label: PropTypes.string,
    filter: PropTypes.string,
    className: PropTypes.string,
    maxSearchResults: PropTypes.string,
    deleteChip: PropTypes.string,
    strings: PropTypes.shape({}),
    resetField: PropTypes.func,
    textFieldStyle: PropTypes.shape({}),
  }

  constructor(props) {
    super(props);
    const { formSelectionState, name } = this.props;
    const initialState = formSelectionState[name] && this.findFromSource(Array.isArray(formSelectionState[name]) ? formSelectionState[name][0] : formSelectionState[name]);

    this.state = {
      searchText: '',
      errorText: '',
      selectedBundle: initialState && initialState.bundle,
      singleSelection: initialState && initialState.singleSelection,
    };
  }

  handleSelect = (value, index) => {
    const {
      name,
      dataSource,
      strict,
      limit,
      formSelectionState,
      addChip = addChipDefault,
      history,
      strings,
    } = this.props;

    const selectedElements = formSelectionState[name];
    if (selectedElements && Array.isArray(selectedElements)) {
      const isSelected = index > -1
        ? selectedElements.includes(value.value)
        : selectedElements.includes(value);
      if (isSelected) {
        // Handle inputs that are already selected
        this.handleUpdateInput('');
        return;
      }
    }

    let input = null;

    if (index > -1) {
      // User selected an element
      input = dataSource.filter(this.bundleFilter)[index];
    } else if (!strict && index === -1) {
      // Direct free input
      input = {
        text: value,
        value,
      };
    } else {
      // Strict and not in datasource
      this.setState({
        searchText: '',
        errorText: strings.filter_error,
      });
      return;
    }

    this.setState({ selectedBundle: value.bundle, singleSelection: value.singleSelection });
    this.handleUpdateInput('');
    addChip(name, input, limit, history);
  };

  handleUpdateInput = (searchText) => {
    this.setState({
      searchText,
      errorText: '', // clear error when user types
    });
  };

  findFromSource = (element) => {
    let fromSource = this.props.dataSource.find(data => Number(data.value) === Number(element));
    fromSource = fromSource || this.props.dataSource.find(data => data.key === element);
    return fromSource || { text: element, value: element };
  }

  bundleFilter = field =>
    !this.state.selectedBundle ||
    (!this.props.formSelectionState[this.props.name] || this.props.formSelectionState[this.props.name].length < 1) ||
    field.bundle === this.state.selectedBundle

  handleClick = () => {
    if (this.state.singleSelection) {
      this.props.resetField();
    }
  }

  render() {
    const {
      name,
      label,
      dataSource = [],
      className,
      maxSearchResults = 150,
      deleteChip = deleteChipDefault,
      history,
      formSelectionState,
      filter,
      textFieldStyle,
    } = this.props;
    const {
      searchText,
      errorText,
    } = this.state;

    const selectedElements = [].concat(formSelectionState[name] || []);
    // Use dataSource on selectedElements to hydrate the chipList
    const chipList = selectedElements.map(this.findFromSource);
    return (
      <div
        className={className}
        data-hint-position="left"
        data-hint={label}
      >
        <AutoComplete
          ref={(ref) => { this.autocomplete = ref; return null; }}
          openOnFocus
          dataSource={dataSource.filter(this.bundleFilter)}
          floatingLabelText={label}
          filter={filter || AutoComplete.fuzzyFilter}
          maxSearchResults={maxSearchResults}
          onNewRequest={this.handleSelect}
          onUpdateInput={this.handleUpdateInput}
          searchText={searchText}
          errorText={errorText}
          listStyle={{ maxHeight: 250, overflow: 'auto' }}
          style={{ flex: '1 0 0' }}
          floatingLabelFocusStyle={{ color: errorText ? colorRed : colorBlue }}
          underlineFocusStyle={{ borderColor: colorBlue }}
          errorStyle={{ color: colorRed }}
          onClose={() => this.setState({ errorText: '' })}
          onClick={this.handleClick}
          textFieldStyle={textFieldStyle}
        />
        <ChipList name={name} chipList={chipList} deleteChip={deleteChip} history={history} />
      </div>);
  }
}

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(FormField);
