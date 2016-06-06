import React, { Component } from 'react';

import { connect } from 'react-redux';
import { REDUCER_KEY } from '../../reducers';
import { getSearchResult } from '../../actions';
import createConstantsWrapper from '../Constants';

import SearchForm from './SearchForm';
import SearchResult from './SearchResult';

const mapStateToProps = (state) => {
  const { error, loading, searchResults } = state[REDUCER_KEY].gotSearch;

  return {
    loading,
    error,
    data: searchResults,
  }
};

const mapDispatchToProps = (dispatch) => ({
    dispatchSearch: (query) => dispatch(getSearchResult(query)),
});
class Search extends Component {

    render() {
      const { dispatchSearch, data } = this.props

        return (<div>
            <SearchForm 
              hintText="Search by name or SteamID" 
              onSubmit={(value) => dispatchSearch(value)}/>
            <SearchResult players={data} />
        </div>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
