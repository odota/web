import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import fuzzy from 'fuzzy';
import { withRouter } from 'react-router-dom';
import { getSearchResultAndPros } from '../../actions';
import SearchResult from './SearchResult';

const extract = item => `${item.name}${item.team_name}`;

const Search = ({
  data, pros, query, matchData, strings, ...rest
}) => (
  <div>
    <Helmet title={`${query} - ${strings.title_search}`} />
    <SearchResult {...rest} players={data || []} pros={pros || []} matchData={matchData} />
  </div>
);

Search.propTypes = {
  data: PropTypes.shape({}),
  pros: PropTypes.arrayOf({}),
  query: PropTypes.string,
  match: PropTypes.shape({}),
  matchData: PropTypes.arrayOf({}),
  strings: PropTypes.shape({}),
};

const mapStateToProps = (state) => {
  const {
    error, loading, done, data, query,
  } = state.app.search;
  return {
    playersLoading: loading,
    playersError: error,
    done,
    data,
    query,
    pros: fuzzy.filter(query, state.app.proPlayers.data, { extract }).map(item => ({ ...item.original })),
    prosLoading: state.app.proPlayers.loading,
    prosError: state.app.proPlayers.error,
    matchData: state.app.match.data,
    matchLoading: state.app.match.loading,
    matchError: state.app.match.error,
    strings: state.app.strings,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatchSearch: query => dispatch(getSearchResultAndPros(query)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
