import React from 'react';

import TextField from 'material-ui/TextField';
// import RaisedButton from 'material-ui/RaisedButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
// import CircularProgress from 'material-ui/CircularProgress';
import { connect } from 'react-redux';
import { getSearchResult, setSearchQuery } from '../../actions';
import { browserHistory } from 'react-router';
// import style from './search.css';
import { REDUCER_KEY } from '../../reducers';

const SearchForm = ({ dispatchSearch, dispatchSetQuery, disabled, query }) => {
  const formSubmit = (e) => {
    e.preventDefault();
    browserHistory.push(`/search?q=${query}`);
    dispatchSearch(query);
  };

  return (
    <form onSubmit={formSubmit}>
      <TextField
        disabled={disabled}
        hintText={'Player Search'}
        value={query}
        onChange={(e) => dispatchSetQuery(e.target.value)}
        fullWidth
        leftIcon={ActionSearch}
      />
    </form>
  );
};

const mapStateToProps = (state) => {
  const { error, loading, done, query, searchResults } = state[REDUCER_KEY].gotSearch;
  return {
    loading,
    error,
    done,
    query,
    data: searchResults,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSearch: (query) => dispatch(getSearchResult(query)),
  dispatchSetQuery: (query) => dispatch(setSearchQuery(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
