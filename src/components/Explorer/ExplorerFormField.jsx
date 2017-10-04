import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
// import FormField from 'components/Form/FormField';

class ExplorerFormField extends React.Component {
  constructor() {
    super();
    this.resetField = this.resetField.bind(this);
    this.addChip = this.addChip.bind(this);
    this.deleteChip = this.deleteChip.bind(this);
  }
  resetField() {
    const { builderField, handleFieldUpdate } = this.props;
    // Set state on the ref'd component to clear it
    if (this.autocomplete) {
      this.autocomplete.setState({
        searchText: '',
      });
    }
    if (this.datepicker) {
      this.datepicker.setState({ date: undefined });
    }
    handleFieldUpdate(builderField, undefined);
  }
  addChip(name, input, limit) {
    const currentChips = [].concat(this.props.builder[name] || []);
    const newChips = [input.key].concat(currentChips).slice(0, limit);
    this.props.handleFieldUpdate(name, newChips);
  }
  deleteChip(name, index) {
    const currentChips = [].concat(this.props.builder[name] || []);
    const newChips = [
      ...currentChips.slice(0, index),
      ...currentChips.slice(index + 1),
    ];
    this.props.handleFieldUpdate(name, newChips);
  }
  render() {
    const { fields, label, builderField, handleFieldUpdate, isDateField, builder } = this.props;
    const dataSource = fields && fields[builderField];
    const fieldWidth = 300;
    if (isDateField) {
      return (<span style={{ width: fieldWidth }}>
        <DatePicker
          ref={(ref) => { this.datepicker = ref; return null; }}
          floatingLabelText={label}
          container="inline"
          autoOk
          defaultDate={builder[builderField] ? new Date(builder[builderField]) : undefined}
          onShow={this.resetField}
          onChange={(event, date) => {
            handleFieldUpdate(builderField, date.toISOString());
          }}
        /></span>);
    }
    return (<span style={{ width: fieldWidth }}>
      {/*
      <FormField
        name={builderField}
        label={label}
        dataSource={dataSource}
        formSelectionState={builder}
        filter={AutoComplete.caseInsensitiveFilter}
        strict
        limit={1}
        addChip={this.addChip}
        deleteChip={this.deleteChip}
      />
      */}
      <AutoComplete
        ref={(ref) => { this.autocomplete = ref; return null; }}
        searchText={builder[builderField]
          ? (dataSource.find(element => element.key === builder[builderField]) || {}).text
          : ''
        }
        openOnFocus
        listStyle={{ maxHeight: 400, overflow: 'auto' }}
        fullWidth
        filter={AutoComplete.caseInsensitiveFilter}
        floatingLabelText={label}
        dataSource={dataSource}
        maxSearchResults={100}
        onClick={this.resetField}
        onNewRequest={(value, index) => {
          handleFieldUpdate(builderField, index > -1 ? value.key : '');
        }}
      />
    </span>);
  }
}

ExplorerFormField.propTypes = {
  fields: PropTypes.array,
  label: PropTypes.string,
  builderField: PropTypes.func,
  handleFieldUpdate: PropTypes.func,
  isDateField: PropTypes.bool,
  builder: PropTypes.func,
};

export default ExplorerFormField;
