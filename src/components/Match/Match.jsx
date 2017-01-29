import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Spinner from 'components/Spinner';
import TabBar from 'components/TabBar';
import {
  getMatch, getPvgnaHeroGuides,
} from 'actions';
import {
  getMatchData,
  getMatchLoading,
} from 'reducers/match';
import {
  getPvgnaGuides,
} from 'reducers/pvgnaGuides';
import { getMetadataUser } from 'reducers/metadata';
import MatchHeader from './MatchHeader';
import matchPages from './matchPages';
import styles from './Match.css';

class RequestLayer extends React.Component {
  componentDidMount() {
    this.props.getMatch(this.props.routeParams.matchId);
    this.props.getPvgnaHeroGuides();
  }

  componentWillUpdate(nextProps) {
    if (this.props.matchId !== nextProps.matchId) {
      this.props.getMatch(nextProps.matchId);
    }
  }

  render() {
    const loading = this.props.loading;
    const match = this.props.match;
    const matchId = this.props.matchId;
    const info = this.props.routeParams.info || 'overview';
    const page = matchPages(matchId).find(page => page.key.toLowerCase() === info);
    const pageTitle = page ? `${matchId} - ${page.name}` : matchId;
    return (
      loading ? <Spinner /> :
      <div>
        <Helmet title={pageTitle} />
        <MatchHeader
          match={match}
          user={this.props.user}
        />
        <TabBar
          info={info}
          tabs={matchPages(matchId, match)}
          mediaQClass={styles.tabBar}
        />
        {page && page.content(match)}
      </div>
    );
  }
}

const mergeHeroGuides = (match, heroGuides) => ({
  ...match,
  players: match.players.map(player => ({
    ...player,
    pvgnaGuide: heroGuides[player.hero_id],
  })),
});

const mapStateToProps = (state, ownProps) => ({
  matchId: ownProps.params.matchId,
  match: mergeHeroGuides(getMatchData(state), getPvgnaGuides(state)),
  loading: getMatchLoading(state),
  user: getMetadataUser(state),
});

const mapDispatchToProps = dispatch => ({
  getMatch: matchId => dispatch(getMatch(matchId)),
  getPvgnaHeroGuides: () => dispatch(getPvgnaHeroGuides()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
