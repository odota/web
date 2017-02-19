import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

class ExplorerFormField extends React.Component {
  constructor() {
    super();
    this.resetField = this.resetField.bind(this);
  }
  resetField() {
    const { builderField, builderContext } = this.props;
    // Set state on the ref'd component to clear it
    this.autocomplete.setState({
      searchText: '',
    });
    builderContext.setState({
      ...builderContext.state,
      builder: {
        ...builderContext.state.builder,
        [builderField]: undefined,
      },
    }, builderContext.buildQuery);
  }
  render() {
    const { dataSource, label, builderField, builderContext } = this.props;
    return (<span>
      <AutoComplete
        ref={ref => (this.autocomplete = ref)}
        openOnFocus
        // fullwidth
        filter={AutoComplete.fuzzyFilter}
        floatingLabelText={label}
        dataSource={dataSource}
        maxSearchResults={50}
        onClick={this.resetField}
        onNewRequest={(value, index) => {
          builderContext.setState({
            ...builderContext.state,
            builder: {
              ...builderContext.state.builder,
              [builderField]: index > -1 ? value : '',
            },
          }, builderContext.buildQuery);
        }}
      />
    </span>);
  }
}

export default ExplorerFormField;
