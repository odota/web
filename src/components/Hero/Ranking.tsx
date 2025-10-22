import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRanking } from '../../actions';
import RankingTable from './RankingTable';
import RankingSkeleton from '../Skeletons/RankingSkeleton';

const renderRanking = (hero: Hero | undefined, rankings: any[]) => (
  <div>
    <RankingTable rankings={rankings} />
  </div>
);

class Ranking extends Component<{
    match: {
      params: {
        heroId: number,
      },
    },
    isLoading: boolean,
    isError: boolean,
    rankings: any[],
    hero?: Hero,
    getRanking: Function,
  }> {
  componentDidMount() {
    if (this.props.match.params && this.props.match.params.heroId) {
      this.props.getRanking(this.props.match.params.heroId);
    }
  }

  render() {
    const { isLoading, isError, rankings, hero } = this.props;

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

const mapStateToProps = (state: any) => ({
  rankings: state.app.heroRanking.data.rankings,
  isLoading: state.app.heroRanking.loading,
  isError: state.app.heroRanking.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  getRanking: (heroId: number) => dispatch(getRanking(heroId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
