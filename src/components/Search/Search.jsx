import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { getSearchResultAndPros } from 'actions';
import { proPlayers } from 'reducers';
import strings from 'lang';
import SearchResult from './SearchResult';
// import SearchForm from './SearchForm';

class Search extends React.Component {
  componentDidMount() {
    if (this.props.location.query.q) {
      this.props.dispatchSearch(this.props.location.query.q);
    }
  }
  render() {
    const { data, pros, ...rest } = this.props;
    return (<div>
      <Helmet title={`${this.props.location.query.q} - ${strings.title_search}`} />
      <SearchResult {...rest} players={data || []} pros={pros || []} />
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { error, loading, done, searchResults, query } = state.app.search;
  return {
    playersLoading: loading,
    playersError: error,
    done,
    data: searchResults,
    pros: proPlayers.getFilteredList(state, query),
    prosLoading: proPlayers.getLoading(state),
    prosError: proPlayers.getError(state),
  };
};

const mapDispatchToProps = dispatch => ({
  dispatchSearch: query => dispatch(getSearchResultAndPros(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
