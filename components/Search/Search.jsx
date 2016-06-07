import React from 'react';

import { connect } from 'react-redux';
import { REDUCER_KEY } from '../../reducers';
import { getSearchResult } from '../../actions';

import SearchForm from './SearchForm';
import SearchResult from './SearchResult';

const Search = ({ dispatchSearch, data, loading, done }) => (
  <div>
    <SearchForm
      hintText="Search by name or SteamID" // TODO replace hardcoded with tooltips.json from yasp core
      disabled={loading}
      onSubmit={(value) => dispatchSearch(value)}
    />
    {done ? <SearchResult players={data} /> : ''}
  </div>
);

const mapStateToProps = (state) => {
  const { error, loading, done, searchResults } = state[REDUCER_KEY].gotSearch;

  return {
    loading,
    error,
    done,
    data: searchResults,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSearch: (query) => dispatch(getSearchResult(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
