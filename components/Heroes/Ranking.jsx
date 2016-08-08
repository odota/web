import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import { ranking } from './../../reducers';
import { getRanking } from './../../actions';

import style from './Heroes.css';
import RankingTable from './RankingTable';
import RankingBadge from './RankingBadge';

class Ranking extends Component {

  componentDidMount() {
    if (this.props.routeParams.hero_id) {
      this.props.getRanking(this.props.routeParams.hero_id);
    }
  }

  renderLoading() {
    return (
      <div className={style.Loading}>
        <CircularProgress color="#fff" />
      </div>
    );
  }

  renderRanking(hero, bestPlayer, rankings) {
    return (
      <div>
        <RankingBadge hero={hero} bestPlayer={bestPlayer} />
        <RankingTable rankings={this.props.rankings} />
      </div>
    );
  }

  render() {
    const { isLoading, isError, rankings, hero } = this.props;
    
    let bestPlayer = null;
    
    if (rankings && rankings.length > 0) {
      bestPlayer = rankings[0];
    }

    return (
      <div>
        {isLoading || isError || rankings == null ? 
          this.renderLoading() : this.renderRanking(hero, bestPlayer, rankings)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hero: ranking.getHero(state),
  rankings: ranking.getRankings(state),
  isLoading: ranking.getLoading(state),
  isError: ranking.getError(state),
});

const mapDispatchToProps = (dispatch) => ({
  getRanking: (heroId) => dispatch(getRanking(heroId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
