import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import { REDUCER_KEY } from './../../reducers';
import { getRanking } from './../../actions';

import style from './heroes.css';
import RankingTable from './RankingTable';
import RankingBadge from './RankingBadge';

class Ranking extends Component {

  componentDidMount() {
    if (this.props.routeParams.hero_id) {
      this.props.getRanking(this.props.routeParams.hero_id);
    }
  }

  render() {
    const { hero_id, rankings, isLoading, heroes } = this.props;
    let bestPlayer = null;
    if (rankings.length > 0) {
      bestPlayer = rankings[0];
    }

    return (
      <div>
        {isLoading ?
          <div className={style.Loading}>
            <CircularProgress color="#fff" />
          </div> : ''}
        <RankingBadge hero={heroes[hero_id]} bestPlayer={bestPlayer} />
        <RankingTable rankings={this.props.rankings} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  heroes: state[REDUCER_KEY].heroes,
  hero_id: state[REDUCER_KEY].gotRanking.hero_id,
  rankings: state[REDUCER_KEY].gotRanking.rankings,
  isLoading: state[REDUCER_KEY].gotRanking.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getRanking: (heroId) => dispatch(getRanking(heroId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
