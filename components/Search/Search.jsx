import React from 'react';

import { connect } from 'react-redux';
import { REDUCER_KEY } from '../../reducers';
import { getSearchResult } from '../../actions';

import SearchForm from './SearchForm';
import SearchResult from './SearchResult';

const Search = ({ dispatchSearch, data }) => (
  <div>
    <SearchForm
      hintText="Search by name or SteamID"
      onSubmit={(value) => dispatchSearch(value)}
    />
    <SearchResult players={data} />
  </div>
);

const mapStateToProps = (state) => {
  const { error, loading, searchResults } = state[REDUCER_KEY].gotSearch;

  return {
    loading,
    error,
    data: searchResults,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSearch: (query) => dispatch(getSearchResult(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
