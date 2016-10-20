import React from 'react';
import {
  connect,
} from 'react-redux';
import { withRouter } from 'react-router';
import AutoComplete from 'material-ui/AutoComplete';
import {
  addChip,
} from 'actions';
import querystring from 'querystring';
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
    router,
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
      this.addChip(router, name, input, limit);
    }
    // Set state on the ref'd component to clear it
    this.autocomplete.setState({
      searchText: '',
    });
  }

  render() {
    const {
      addChip,
      name,
      formName,
      label,
      dataSource = [],
      dataSourceConfig,
      className,
      strict,
      maxSearchResults = 10,
      limit,
      router,
      currentQueryString,
    } = this.props;

    // Use dataSource on current querystring to hydrate the chipList
    const query = querystring.parse(currentQueryString.substring(1));
    const field = [].concat(query[name] || []);
    const chipList = field.map(element => dataSource.find(data => Number(data.value) === Number(element)));

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
          this.handleRequest({ value, index, formName, name, dataSourceConfig, dataSource, strict, addChip, limit, router })
        }
        listStyle={{ textTransform: 'uppercase' }}
        floatingLabelFocusStyle={{ color: styles.blue }}
        underlineFocusStyle={{ borderColor: styles.blue }}
        fullWidth
      />
      <ChipList name={name} formName={formName} chipList={chipList} />
    </div>);
  }
}

const mapStateToProps = state => ({
  currentQueryString: state.routing.locationBeforeTransitions.search,
});

const mapDispatchToProps = dispatch => ({
  addChip: (router, name, input, limit) => dispatch(addChip(router, name, input, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FormField));
