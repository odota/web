import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';

class ExplorerFormField extends React.Component {
  constructor() {
    super();
    this.resetField = this.resetField.bind(this);
  }
  resetField() {
    const { builderField, builderContext } = this.props;
    // Set state on the ref'd component to clear it
    if (this.autocomplete) {
      this.autocomplete.setState({
        searchText: '',
      });
    }
    if (this.datepicker) {
      this.datepicker.setState({ date: undefined });
    }
    builderContext.setState({
      ...builderContext.state,
      builder: {
        ...builderContext.state.builder,
        [builderField]: undefined,
      },
    }, builderContext.buildQuery);
  }
  render() {
    const { fields, label, builderField, builderContext, isDateField } = this.props;
    const dataSource = fields && fields[builderField];
    if (isDateField) {
      return (<DatePicker
        ref={ref => (this.datepicker = ref)}
        floatingLabelText={label}
        container="inline"
        autoOk
        defaultDate={builderContext.state.builder[builderField] ? new Date(builderContext.state.builder[builderField]) : undefined}
        onShow={this.resetField}
        onChange={(event, date) => {
          builderContext.setState({
            ...builderContext.state,
            builder: {
              ...builderContext.state.builder,
              [builderField]: date.toISOString(),
            },
          }, builderContext.buildQuery);
        }}
      />);
    }
    return (<span>
      <AutoComplete
        ref={ref => (this.autocomplete = ref)}
        searchText={builderContext.state.builder[builderField]
          ? (dataSource.find(element => element.key === builderContext.state.builder[builderField]) || {}).text
          : undefined
        }
        openOnFocus
        listStyle={{ maxHeight: 400, overflow: 'auto' }}
        // fullWidth
        filter={AutoComplete.fuzzyFilter}
        floatingLabelText={label}
        dataSource={dataSource}
        maxSearchResults={100}
        onClick={this.resetField}
        onNewRequest={(value, index) => {
          builderContext.setState({
            ...builderContext.state,
            builder: {
              ...builderContext.state.builder,
              [builderField]: index > -1 ? value.key : '',
            },
          }, builderContext.buildQuery);
        }}
      />
    </span>);
  }
}

export default ExplorerFormField;
