import React from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from 'material-ui/AutoComplete';
import ChipList from './ChipList';
import { connect } from 'react-redux';
import { addChip, setFieldText } from '../../actions';
import { form } from '../../reducers';

const onNewRequest = (value, index, formName, name, dataSourceConfig, strict, addChip, autoComplete, setFieldText) => {
  if (index !== -1) {
    addChip(
      formName,
      name, {
        text: value[dataSourceConfig.text],
        value: value[dataSourceConfig.value],
      }
    );
    setFieldText(formName, name, '');
  }
  if (index === -1 && !strict) {
    addChip(
      formName,
      name, {
        text: value,
        value,
      }
    );
    setFieldText(formName, name, '');
  }
};

const FormField = ({ name, formName, label, dataSource, dataSourceConfig, addChip, className, strict, text, setFieldText }) => {
  let autoComplete;

  return (
    <div className={className}>
      <AutoComplete
        dataSource={dataSource}
        dataSourceConfig={dataSourceConfig}
        floatingLabelText={label}
        filter={AutoComplete.fuzzyFilter}
        maxSearchResults={5}
        onNewRequest={(value, index) => onNewRequest(value, index, formName, name, dataSourceConfig, strict, addChip, autoComplete, setFieldText)}
        onUpdateInput={searchText => setFieldText(formName, name, searchText)}
        listStyle={{ textTransform: 'uppercase' }}
        ref={elem => { autoComplete = elem; }}
        searchText={text}
      />
      <ChipList name={name} formName={formName} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  text: form.getFieldText(state, ownProps.formName, ownProps.name),
});

export default connect(mapStateToProps, { addChip, setFieldText })(FormField);
