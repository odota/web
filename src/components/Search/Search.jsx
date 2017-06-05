import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { getSearchResultAndPros } from 'actions';
import strings from 'lang';
import fuzzy from 'fuzzy';
import { withRouter } from 'react-router-dom';
import SearchResult from './SearchResult';

const extract = item => `${item.name}${item.team_name}`;

const Search = ({ data, pros, query, ...rest }) => (<div>
  <Helmet title={`${query} - ${strings.title_search}`} />
  <SearchResult {...rest} players={data || []} pros={pros || []} />
</div>
  );

const mapStateToProps = (state) => {
  const { error, loading, done, data, query } = state.app.search;
  return {
    playersLoading: loading,
    playersError: error,
    done,
    data,
    query,
    pros: fuzzy.filter(query, state.app.proPlayers.data, { extract }).map(item => ({ ...item.original })),
    prosLoading: state.app.proPlayers.loading,
    prosError: state.app.proPlayers.error,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatchSearch: query => dispatch(getSearchResultAndPros(query)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
