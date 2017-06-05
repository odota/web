import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash.debounce';
import TextField from 'material-ui/TextField';
import { getSearchResultAndPros, setSearchQuery } from 'actions';
import strings from 'lang';
import querystring from 'querystring';
import styles from './search.css';

class SearchForm extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.formSubmit = this.formSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.debouncedSetQuery = this.debouncedSetQuery.bind(this);
  }

  componentWillMount() {
    const params = querystring.parse(window.location.search.substring(1));
    const { pathname } = window.location;
    if (params.q && pathname === '/search') {
      this.props.dispatchSearch(params.q);
    }
  }

  formSubmit(e) {
    const { query } = this.state;
    e.preventDefault();
    this.props.history.push(`/search?q=${query}`);
    this.props.dispatchSearch(query);
  }

  debouncedSetQuery() {
    debounce(this.props.dispatchSetQuery, 100);
  }

  handleChange(e) {
    const { pathname } = window.location;
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

export default withRouter(connect(null, mapDispatchToProps)(SearchForm));
