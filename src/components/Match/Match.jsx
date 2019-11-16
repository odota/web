import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { List } from 'react-content-loader';
import TabbedContent from '../TabbedContent';
import { getMatch } from '../../actions';
import MatchHeader from './MatchHeader';
import matchPages from './matchPages';
import FourOhFour from '../../components/FourOhFour';

class RequestLayer extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    matchData: PropTypes.shape({}),
    match: PropTypes.shape({
      params: PropTypes.shape({
        info: PropTypes.string,
      }),
    }),
    user: PropTypes.shape({}),
    getMatch: PropTypes.func,
    matchId: PropTypes.string,
    strings: PropTypes.shape({}),
  }

  componentDidMount() {
    this.props.getMatch(this.props.matchId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.matchId !== prevProps.matchId) {
      this.props.getMatch(this.props.matchId);
    }
  }

  render() {
    const {
      loading, matchId, matchData, error, strings, match, user,
    } = this.props;
    const info = match.params.info || 'overview';
    const page = matchPages(matchId, null, strings).find(_page => _page.key.toLowerCase() === info);
    const pageTitle = page ? `${matchId} - ${page.name}` : matchId;
    if (error && !loading) {
      return <FourOhFour msg={strings.request_invalid_match_id} />;
    }
    return loading ? <List primaryColor="#666" width={250} height={120} /> :
      (
        <div>
          <Helmet title={pageTitle} />
          <MatchHeader
            match={matchData}
            user={user}
          />
          <TabbedContent
            info={info}
            tabs={matchPages(matchId, matchData, strings)}
            match={matchData}
            content={page && page.content(matchData)}
            skeleton={page && page.skeleton}
          />
        </div>);
  }
}

const mapStateToProps = state => ({
  matchData: state.app.match.data,
  loading: state.app.match.loading,
  error: state.app.match.error,
  user: state.app.metadata.data.user,
  strings: state.app.strings,
});

const mapDispatchToProps = dispatch => ({
  getMatch: matchId => dispatch(getMatch(matchId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
