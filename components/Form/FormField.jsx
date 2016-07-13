import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import ChipList from './ChipList';
import { connect } from 'react-redux';
import { addChip, setFieldText } from '../../actions';
import { form } from '../../reducers';
import { getClosestMatch } from './utility';
import styles from './FormField.css';

const onNewRequest = (value, index, formName, name, dataSourceConfig, dataSource, strict, addChip, setFieldText, limit) => {
  if (index !== -1) {
    addChip(
      formName,
      name, {
        text: value[dataSourceConfig.text],
        value: value[dataSourceConfig.value],
      },
      limit
    );
    setFieldText(formName, name, '');
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
      setFieldText(formName, name, '');
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
    setFieldText(formName, name, '');
  }
};

const FormField = ({
  name, formName, label, dataSource = [], dataSourceConfig,
  addChip, className, strict, text, setFieldText, maxSearchResults = 5,
  limit,
}) => (
  <div className={className}>
    <AutoComplete
      dataSource={dataSource}
      dataSourceConfig={dataSourceConfig}
      floatingLabelText={label}
      filter={AutoComplete.fuzzyFilter}
      maxSearchResults={maxSearchResults}
      onNewRequest={(value, index) =>
        onNewRequest(value, index, formName, name, dataSourceConfig, dataSource, strict, addChip, setFieldText, limit)}
      onUpdateInput={searchText => searchText.length === 1 && setFieldText(formName, name, searchText)}
      listStyle={{ textTransform: 'uppercase' }}
      searchText={text}
      floatingLabelFocusStyle={{ color: styles.color }}
      underlineFocusStyle={{ borderColor: styles.color }}
      fullWidth
    />
    <ChipList name={name} formName={formName} />
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  text: form.getFieldText(state, ownProps.formName, ownProps.name),
});

export default connect(mapStateToProps, { addChip, setFieldText })(FormField);
