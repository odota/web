import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import debounce from 'lodash.debounce';
import TextField from 'material-ui/TextField';
import { getSearchResultAndPros, setSearchQuery } from 'actions';
import strings from 'lang';
import styles from './search.css';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    let query = '';
    const location = browserHistory.getCurrentLocation();
    if (location.pathname === '/search') {
      // Avoid getting ?q= from other paths
      query = location.query.q;
    }
    this.state = { query };

    this.formSubmit = this.formSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.debouncedSetQuery = debounce(this.props.dispatchSetQuery, 100);
  }

  formSubmit(e) {
    const { query } = this.state;

    e.preventDefault();
    browserHistory.push(`/search?q=${query}`);
    this.props.dispatchSearch(query);
  }

  handleChange(e) {
    const { pathname } = browserHistory.getCurrentLocation();
    const { value } = e.target;

    this.setState({
      query: value,
    });

    if (pathname === '/search') {
      this.debouncedSetQuery(value);
    }
  }

  render() {
    return (
      <form onSubmit={this.formSubmit}>
        <TextField
          hintText={strings.search_title}
          value={this.state.query}
          onChange={this.handleChange}
          fullWidth
          underlineFocusStyle={{
            borderColor: styles.searchBarColor,
            bottom: '-4px',
            left: '-40px',
            width: 'calc(100% + 40px)',
          }}
          underlineStyle={{ borderColor: 'transparent' }}
        />
      </form>
    );
  }
}
SearchForm.propTypes = {
  dispatchSearch: PropTypes.func,
  dispatchSetQuery: PropTypes.func,
};

// const mapStateToProps = (state) => {
//   const { error, loading, done } = state.app.search;
//   return {
//     loading,
//     done,
//     error,
//     query,
//     data: searchResults,
//   };
// };

const mapDispatchToProps = dispatch => ({
  dispatchSearch: query => dispatch(getSearchResultAndPros(query)),
  dispatchSetQuery: query => dispatch(setSearchQuery(query)),
});

export default connect(null, mapDispatchToProps)(SearchForm);
