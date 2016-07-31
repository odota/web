import React from 'react';
import Spinner from '../Spinner';
import { REDUCER_KEY } from '../../reducers';
import { connect } from 'react-redux';
import { getSearchResult } from '../../actions';

// import SearchForm from './SearchForm';
import SearchResult from './SearchResult';

class Search extends React.Component {
  componentDidMount() {
    if (this.props.location.query.q) {
      this.props.dispatchSearch(this.props.location.query.q);
    }
  }
  render() {
    return this.props.loading ? <Spinner /> : <SearchResult players={this.props.data || []} />;
  }
}

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
