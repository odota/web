import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Spinner from 'components/Spinner';
import TabBar from 'components/TabBar';
import {
  getMatch, getPvgnaHeroGuides,
} from 'actions';
import MatchHeader from './MatchHeader';
import matchPages from './matchPages';
import styles from './Match.css';

class RequestLayer extends React.Component {
  componentDidMount() {
    this.props.getMatch(this.props.matchId);
    this.props.getPvgnaHeroGuides();
  }

  componentWillUpdate(nextProps) {
    if (this.props.matchId !== nextProps.matchId) {
      this.props.getMatch(nextProps.matchId);
    }
  }

  render() {
    const loading = this.props.loading;
    const match = this.props.matchData;
    const matchId = this.props.matchId;
    const info = this.props.match.params.info || 'overview';
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

const mapStateToProps = state => ({
  matchData: mergeHeroGuides(state.app.match.data, state.app.pvgnaGuides.data),
  loading: state.app.match.loading,
  user: state.app.metadata.data.user,
});

const mapDispatchToProps = dispatch => ({
  getMatch: matchId => dispatch(getMatch(matchId)),
  getPvgnaHeroGuides: () => dispatch(getPvgnaHeroGuides()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
