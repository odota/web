import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'components/Spinner';
import TabBar from 'components/TabBar';
import { getMatch } from 'actions';
import {
  getMatchData,
  getMatchLoading,
} from 'reducers/match';
import { getMetadataUser } from 'reducers/metadata';
import MatchHeader from './MatchHeader';
import matchPages from './matchPages';
import styles from './Match.css';

class RequestLayer extends React.Component {
  componentDidMount() {
    this.props.getMatch(this.props.routeParams.matchId);
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
    const page = matchPages(matchId).find(page => page.name.toLowerCase() === info);
    return (
      loading ? <Spinner /> :
        <div>
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

const mapStateToProps = (state, ownProps) => ({
  matchId: ownProps.params.matchId,
  match: getMatchData(state),
  loading: getMatchLoading(state),
  user: getMetadataUser(state),
});

const mapDispatchToProps = dispatch => ({
  getMatch: matchId => dispatch(getMatch(matchId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
