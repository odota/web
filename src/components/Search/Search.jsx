import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { getSearchResultAndPros } from 'actions';
import strings from 'lang';
import fuzzy from 'fuzzy';
import SearchResult from './SearchResult';

const extract = item => `${item.name}${item.team_name}`;

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
  const { error, loading, done, data, query } = state.app.search;
  return {
    playersLoading: loading,
    playersError: error,
    done,
    data,
    pros: fuzzy.filter(query, state.app.proPlayers.data, { extract }).map(item => ({ ...item.original })),
    prosLoading: state.app.proPlayers.loading,
    prosError: state.app.proPlayers.error,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatchSearch: query => dispatch(getSearchResultAndPros(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
