import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { blue, red } from 'components/palette.css';
import strings from 'lang';
import querystring from 'querystring';
import ChipList from './ChipList';

const addChipDefault = (name, input, limit, history) => {
  const query = querystring.parse(window.location.search.substring(1));
  const field = [input.value].concat(query[name] || []).slice(0, limit);
  const newQuery = {
    ...query,
    [name]: field,
  };
  history.push(`${window.location.pathname}?${querystring.stringify(newQuery)}`);
};

const deleteChipDefault = (name, index, history) => {
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
};

function formField({ formSelectionState, history, addChip, deleteChip }) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        searchText: '',
        errorText: '',
      };
      this.handleSelect = this.handleSelect.bind(this);
      this.handleUpdateInput = this.handleUpdateInput.bind(this);
    }

    handleSelect(value, index) {
      const {
        name,
        dataSource,
        strict,
        limit,
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
        input = dataSource[index];
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

      this.handleUpdateInput('');
      addChip(name, input, limit, history);
    }

    handleUpdateInput(searchText) {
      this.setState({
        searchText,
        errorText: '', // clear error when user types
      });
    }

    render() {
      const {
        name,
        label,
        dataSource = [],
        className,
        maxSearchResults = 10,
      } = this.props;
      const {
        searchText,
        errorText,
      } = this.state;

      const selectedElements = [].concat(formSelectionState[name] || []);
      // Use dataSource on selectedElements to hydrate the chipList
      const chipList = selectedElements.map((element) => {
        const fromSource = dataSource.find(data => Number(data.value) === Number(element));
        return fromSource || { text: element, value: element };
      });

      return (<div className={className}>
        <AutoComplete
          ref={ref => (this.autocomplete = ref)}
          openOnFocus
          dataSource={dataSource}
          floatingLabelText={label}
          filter={AutoComplete.fuzzyFilter}
          maxSearchResults={maxSearchResults}
          onNewRequest={this.handleSelect}
          onUpdateInput={this.handleUpdateInput}
          searchText={searchText}
          errorText={errorText}
          style={{ flex: '1 0 0' }}
          floatingLabelFocusStyle={{ color: errorText ? red : blue }}
          underlineFocusStyle={{ borderColor: blue }}
          errorStyle={{ color: red }}
          onClose={() => this.setState({ errorText: '' })}
        />
        <ChipList name={name} chipList={chipList} deleteChip={deleteChip} history={history} />
      </div>);
    }
  };
}

export default ({ children, formSelectionState, history, addChip, deleteChip }) => (
  children(formField({ formSelectionState, history, addChip: addChip || addChipDefault, deleteChip: deleteChip || deleteChipDefault }))
);
