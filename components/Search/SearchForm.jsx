import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import CircularProgress from 'material-ui/CircularProgress';
import { connect } from 'react-redux';
import { getSearchResult, setSearchQuery } from '../../actions';
import { browserHistory } from 'react-router'
import style from './search.css';
import { REDUCER_KEY } from '../../reducers';

const loadingStyle = {
  display: 'block',
  margin: '40px auto 0 auto',
};

const SearchForm = ({ location, dispatchSearch, dispatchSetQuery, hintText, onSubmit, disabled, query }) => {
  const formSubmit = (e) => {
    e.preventDefault();
    browserHistory.push(`/search?q=${query}`); 
    dispatchSearch(query);
  };
  const loadingIndicator = () => (
    <div className={style.loadingWrapper}>
      <CircularProgress style={loadingStyle} />
    </div>
  );

  return (
    <form onSubmit={formSubmit}>
      <TextField
        disabled={disabled}
        hintText={hintText}
        value={query}
        onChange={(e) => dispatchSetQuery(e.target.value)}
        fullWidth
      />
      <RaisedButton
        type="submit"
        label="Search"
        disabled={disabled}
        icon={<ActionSearch />}
      />
      {disabled ? loadingIndicator() : ''}
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
