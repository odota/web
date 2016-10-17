import React from 'react';
import {
  connect,
} from 'react-redux';
import AutoComplete from 'material-ui/AutoComplete';
import {
  addChip,
} from 'actions';
import {
  form,
} from 'reducers';
import getClosestMatch from './utility';
import ChipList from './ChipList';
import styles from '../palette.css';

class FormField extends React.Component {
  handleRequest({
    value,
    index,
    formName,
    name,
    dataSourceConfig,
    dataSource,
    strict,
    addChip,
    limit,
  }) {
    if (index !== -1) {
      addChip(
        formName,
        name, {
          text: value[dataSourceConfig.text],
          value: value[dataSourceConfig.value],
        },
        limit
      );
    }
    if (strict && index === -1) {
      const closestMatch = getClosestMatch(
        dataSource, dataSourceConfig,
        AutoComplete.fuzzyFilter, value[dataSourceConfig.text] || value
      );
      // We can't just do truthy check here because the value could be 0
      if (closestMatch.value || closestMatch.value === 0) {
        addChip(
          formName,
          name, {
            text: closestMatch.text,
            value: closestMatch.value,
          },
          limit
        );
      }
    }
    if (!strict && index === -1) {
      addChip(
        formName,
        name, {
          text: value,
          value,
        },
        limit
      );
    }
    this.input.setState({
      searchText: '',
    });
  }

  render() {
    const {
      name,
      formName,
      label,
      dataSource = [],
      dataSourceConfig,
      addChip,
      className,
      strict,
      text,
      maxSearchResults = 5,
      limit,
    } = this.props;

    return (<div className={className}>
      <AutoComplete
        ref={ref => (this.input = ref)}
        openOnFocus
        dataSource={dataSource}
        dataSourceConfig={dataSourceConfig}
        floatingLabelText={label}
        filter={AutoComplete.fuzzyFilter}
        maxSearchResults={maxSearchResults}
        onNewRequest={(value, index) =>
        this.handleRequest({ value, index, formName, name, dataSourceConfig, dataSource, strict, addChip, limit })}
        // onUpdateInput={searchText => searchText.length === 1 && setFieldText(formName, name, searchText)}
        listStyle={{ textTransform: 'uppercase' }}
        searchText={text}
        floatingLabelFocusStyle={{ color: styles.blue }}
        underlineFocusStyle={{ borderColor: styles.blue }}
        fullWidth
      />
      <ChipList name={name} formName={formName} />
    </div>);
  }
}

const mapStateToProps = (state, ownProps) => ({
  text: form.getFormFieldText(state, ownProps.formName, ownProps.name),
});

export default connect(mapStateToProps, {
  addChip,
})(FormField);
