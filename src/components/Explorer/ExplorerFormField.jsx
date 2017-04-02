import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';

class ExplorerFormField extends React.Component {
  constructor() {
    super();
    this.resetField = this.resetField.bind(this);
  }
  resetField() {
    const { builderField, context } = this.props;
    // Set state on the ref'd component to clear it
    if (this.autocomplete) {
      this.autocomplete.setState({
        searchText: '',
      });
    }
    if (this.datepicker) {
      this.datepicker.setState({ date: undefined });
    }
    context.setState({
      ...context.state,
      builder: {
        ...context.state.builder,
        [builderField]: undefined,
      },
    }, context.buildQuery);
  }
  render() {
    const { fields, label, builderField, context, isDateField } = this.props;
    const dataSource = fields && fields[builderField];
    const fieldWidth = 400;
    if (isDateField) {
      return (<span style={{ width: fieldWidth }}>
        <DatePicker
          ref={ref => (this.datepicker = ref)}
          floatingLabelText={label}
          container="inline"
          autoOk
          defaultDate={context.state.builder[builderField] ? new Date(context.state.builder[builderField]) : undefined}
          onShow={this.resetField}
          onChange={(event, date) => {
            context.setState({
              ...context.state,
              builder: {
                ...context.state.builder,
                [builderField]: date.toISOString(),
              },
            }, context.buildQuery);
          }}
        /></span>);
    }
    return (<span style={{ width: fieldWidth }}>
      <AutoComplete
        ref={ref => (this.autocomplete = ref)}
        searchText={context.state.builder[builderField]
          ? (dataSource.find(element => element.key === context.state.builder[builderField]) || {}).text
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
          context.setState({
            ...context.state,
            builder: {
              ...context.state.builder,
              [builderField]: index > -1 ? value.key : '',
            },
          }, context.buildQuery);
        }}
      />
    </span>);
  }
}

export default ExplorerFormField;
