import React, { Component } from 'react';
import { shape, string, bool, oneOfType, func, arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import { getRanking } from '../../actions';
import RankingTable from './RankingTable';
import RankingSkeleton from '../Skeletons/RankingSkeleton';

const renderRanking = (hero, rankings) => (
  <div>
    <RankingTable rankings={rankings} />
  </div>
);

class Ranking extends Component {
  static propTypes = {
    match: shape({
      params: shape({
        heroId: string,
      }),
    }),
    isLoading: bool,
    isError: bool,
    rankings: oneOfType([
      arrayOf(shape({})),
      shape({}),
    ]),
    hero: string,
    getRanking: func,
  }

  componentDidMount() {
    if (
      this.props.match.params &&
      this.props.match.params.heroId
    ) {
      this.props.getRanking(this.props.match.params.heroId);
    }
  }

  render() {
    const {
      isLoading, isError, rankings, hero,
    } = this.props;

    return (
      <div>
        {isLoading || isError || rankings === null ? (
          <RankingSkeleton />
        ) : (
          renderRanking(hero, rankings || [])
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rankings: state.app.heroRanking.data.rankings,
  isLoading: state.app.heroRanking.loading,
  isError: state.app.heroRanking.error,
});

const mapDispatchToProps = dispatch => ({
  getRanking: heroId => dispatch(getRanking(heroId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
