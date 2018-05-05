import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { List } from 'react-content-loader';
import TabBar from '../TabBar';
import { getMatch } from '../../actions';
import MatchHeader from './MatchHeader';
import matchPages from './matchPages';

class RequestLayer extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
    matchData: PropTypes.shape({}),
    match: PropTypes.shape({
      params: PropTypes.shape({
        info: PropTypes.string,
      }),
    }),
    user: PropTypes.shape({}),
    getMatch: PropTypes.func,
    matchId: PropTypes.string,
  }

  componentDidMount() {
    this.props.getMatch(this.props.matchId);
  }

  UNSAFE_componentWillUpdate(nextProps) {
    if (this.props.matchId !== nextProps.matchId) {
      this.props.getMatch(nextProps.matchId);
    }
  }

  render() {
    const { loading, matchId, matchData } = this.props;
    const info = this.props.match.params.info || 'overview';
    const page = matchPages(matchId).find(_page => _page.key.toLowerCase() === info);
    const pageTitle = page ? `${matchId} - ${page.name}` : matchId;
    return loading ? <List primaryColor="#666" width={250} height={120} /> :
      (
        <div>
          <Helmet title={pageTitle} />
          <MatchHeader
            match={matchData}
            user={this.props.user}
          />
          <TabBar
            info={info}
            tabs={matchPages(matchId, matchData)}
            match={matchData}
          />
          {page && page.content(matchData)}
        </div>);
  }
}

const mapStateToProps = state => ({
  matchData: state.app.match.data,
  loading: state.app.match.loading,
  user: state.app.metadata.data.user,
});

const mapDispatchToProps = dispatch => ({
  getMatch: matchId => dispatch(getMatch(matchId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
