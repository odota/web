import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';

class ExplorerFormField extends React.Component {
  constructor() {
    super();
    this.resetField = this.resetField.bind(this);
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
  render() {
    const { fields, label, builderField, handleFieldUpdate, isDateField, builder } = this.props;
    const dataSource = fields && fields[builderField];
    const fieldWidth = 400;
    if (isDateField) {
      return (<span style={{ width: fieldWidth }}>
        <DatePicker
          ref={ref => (this.datepicker = ref)}
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
      <AutoComplete
        ref={ref => (this.autocomplete = ref)}
        searchText={builder[builderField]
          ? (dataSource.find(element => element.key === builder[builderField]) || {}).text
          : undefined
        }
        openOnFocus
        listStyle={{ maxHeight: 400, overflow: 'auto' }}
        fullWidth
        filter={AutoComplete.fuzzyFilter}
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

export default ExplorerFormField;
