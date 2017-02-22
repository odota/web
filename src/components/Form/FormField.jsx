import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
// import getClosestMatch from './utility';
import ChipList from './ChipList';
import styles from '../palette.css';

class FormField extends React.Component {
  handleRequest({
    value,
    index,
    name,
    dataSource,
    strict,
    limit,
  }) {
    let input = null;
    if (index > -1) {
      // User selected an element
      input = dataSource[index];
    }
    if (!strict && index === -1) {
      // Direct free input
      input = {
        text: value,
        value,
      };
    }
    /*
    if (strict && index === -1) {
      // No match found, try to select closest
      // I'm not sure we need this, the fuzzy search already automatically helps the user. It's their responsibility to select one.
      const closestMatch = getClosestMatch(
        dataSource, dataSourceConfig,
        AutoComplete.fuzzyFilter, value[dataSourceConfig.text] || value
      );
      // We can't just do truthy check here because the value could be 0
      if (closestMatch.value || closestMatch.value === 0) {
        input = {
          text: closestMatch.text,
          value: closestMatch.value,
        };
      }
    }
    */
    if (input) {
      this.props.addChip(name, input, limit);
    }
    // Set state on the ref'd component to clear it
    this.autocomplete.setState({
      searchText: '',
    });
  }

  render() {
    const {
      name,
      label,
      dataSource = [],
      dataSourceConfig,
      className,
      strict,
      maxSearchResults = 10,
      limit,
      selectedElements,
      deleteChip,
    } = this.props;

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
        dataSourceConfig={dataSourceConfig}
        floatingLabelText={label}
        filter={AutoComplete.fuzzyFilter}
        maxSearchResults={maxSearchResults}
        onNewRequest={(value, index) =>
          this.handleRequest({ value, index, name, dataSourceConfig, dataSource, strict, limit })
        }
        listStyle={{ textTransform: 'uppercase' }}
        floatingLabelFocusStyle={{ color: styles.blue }}
        underlineFocusStyle={{ borderColor: styles.blue }}
        fullWidth
      />
      <ChipList name={name} chipList={chipList} deleteChip={deleteChip} />
    </div>);
  }
}

export default FormField;
