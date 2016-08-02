import React, { Component } from 'react';
import { connect } from 'react-redux';
import { heroes } from 'dotaconstants';

import { REDUCER_KEY } from './../../reducers';
import { getRanking } from './../../actions';

import RankingTable from './RankingTable';
import RankingBadge from './RankingBadge';

class Ranking extends Component {

  componentDidMount() {
    if (this.props.routeParams.hero_id) {
      this.props.getRanking(this.props.routeParams.hero_id);
    }
  }

  render() {
    const { hero_id, rankings } = this.props;
    let bestPlayer = null;
    if (rankings.length > 0) {
      bestPlayer = rankings[0];
    }

    return (
      <div>
        <RankingBadge hero={heroes[hero_id]} bestPlayer={bestPlayer} />
        <RankingTable rankings={this.props.rankings} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hero_id: state[REDUCER_KEY].gotRanking.hero_id,
  rankings: state[REDUCER_KEY].gotRanking.rankings,
});

const mapDispatchToProps = (dispatch) => ({
  getRanking: (heroId) => dispatch(getRanking(heroId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
