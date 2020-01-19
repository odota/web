import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import FormField from '../Form/FormField';

class ExplorerFormField extends React.Component {
  static propTypes = {
    fields: PropTypes.arrayOf({}),
    label: PropTypes.string,
    builderField: PropTypes.func,
    handleFieldUpdate: PropTypes.func,
    isDateField: PropTypes.bool,
    builder: PropTypes.func,
    chipLimit: PropTypes.number,
    multipleSelect: PropTypes.bool,
  };

  constructor() {
    super();
    this.state = {};
    import('material-ui/DatePicker').then(dp => this.setState({ DatePicker: dp.default }));
  }

  componentDidUpdate(newProps) {
    if (this.autocomplete && this.autocomplete.state) {
      const {
        builderField, builder, fields,
      } = newProps;
      const dataSource = fields && fields[builderField];
      const searchText = builder[builderField]
        ? (dataSource.find(element => element.key === builder[builderField]) || {}).text
        : '';
      if (searchText) {
        this.autocomplete.setState({
          searchText,
        });
      }
    }
  }

  addChip = (name, input, limit) => {
    const currentChips = [].concat(this.props.builder[name] || []);
    const newChips = currentChips.includes(input.key) ? currentChips : [input.key].concat(currentChips).slice(0, limit);
    this.props.handleFieldUpdate(name, newChips);
  };

  deleteChip = (name, index) => {
    const currentChips = [].concat(this.props.builder[name] || []);
    const newChips = [
      ...currentChips.slice(0, index),
      ...currentChips.slice(index + 1),
    ];
    this.props.handleFieldUpdate(name, newChips);
  };

  resetField = () => {
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
  };

  render() {
    const { DatePicker } = this.state;
    const {
      fields, label, builderField, handleFieldUpdate, isDateField, builder, chipLimit, multipleSelect,
    } = this.props;
    const dataSource = fields && fields[builderField];
    const fieldWidth = 280;
    if (isDateField) {
      return (
        <span style={{ width: fieldWidth }}>
          {DatePicker
          && (
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
          />
          )}
        </span>);
    }
    return (
      <span style={{ width: fieldWidth }}>
        { multipleSelect
          ? (
            <FormField
              name={builderField}
              label={label}
              dataSource={dataSource}
              formSelectionState={builder}
              filter={AutoComplete.caseInsensitiveFilter}
              strict
              limit={chipLimit}
              addChip={this.addChip}
              deleteChip={this.deleteChip}
              resetField={this.resetField}
            />
          )
          : (
            <AutoComplete
              ref={(ref) => { this.autocomplete = ref; return null; }}
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
          )
    }
      </span>);
  }
}

export default ExplorerFormField;
