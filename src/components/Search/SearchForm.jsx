import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import TextField from 'material-ui/TextField';
// import RaisedButton from 'material-ui/RaisedButton';
// import ActionSearch from 'material-ui/svg-icons/action/search';
// import CircularProgress from 'material-ui/CircularProgress';
import { getSearchResult, setSearchQuery } from 'actions';
import styles from './search.css';

const SearchForm = ({ dispatchSearch, dispatchSetQuery, query }) => {
  const formSubmit = (e) => {
    e.preventDefault();
    browserHistory.push(`/search?q=${query}`);
    dispatchSearch(query);
  };

  return (
    <form onSubmit={formSubmit}>
      <TextField
        hintText={'Player Search'}
        value={query}
        onChange={e => dispatchSetQuery(e.target.value)}
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
};

const mapStateToProps = (state) => {
  const { error, loading, done, query, searchResults } = state.app.search;
  return {
    loading,
    done,
    error,
    query,
    data: searchResults,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatchSearch: query => dispatch(getSearchResult(query)),
  dispatchSetQuery: query => dispatch(setSearchQuery(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
