import React from 'react';
import {
  connect,
} from 'react-redux';
import { withRouter } from 'react-router';
import AutoComplete from 'material-ui/AutoComplete';
/*
import {
  addChip,
} from 'actions';
*/
import querystring from 'querystring';
// import getClosestMatch from './utility';
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
    */
    // Update querystring
    if (input) {
      const query = querystring.parse(window.location.search.substring(1));
      const field = [input.value].concat(query[name] || []).slice(0, limit);
      router.push({pathname: window.location.pathname, query: { 
        ...query,
        [name]: field,
      }});
    }
    // Set state on the ref'd component to clear it
    this.autocomplete.setState({
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
      maxSearchResults = 5,
      limit,
      router,
      currentQueryString,
    } = this.props;

    // Use dataSource on current querystring to hydrate the chipList
    const query = querystring.parse(currentQueryString.substring(1));
    const field = [].concat(query[name] || []);
    const chipList = field.map((element) => dataSource.find((data) => Number(data.value) === Number(element)));

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

const mapStateToProps = (state, ownProps) => ({
  currentQueryString: state.routing.locationBeforeTransitions.search,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FormField));
