import React, { Component } from 'react';
import { shape, string, bool, oneOfType, func, arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import ContentLoader from 'react-content-loader';
import { getRanking } from '../../actions';
import RankingTable from './RankingTable';

const renderRanking = (hero, rankings) => (
  <div>
    <RankingTable rankings={rankings} />
  </div>
);

const RankingSkeleton = props => (
  <ContentLoader
    primaryColor="#371b68"
    secondaryColor="#371b68"
    width={400}
    animate={false}
    {...props}
  >
    <rect x="0" y="10" rx="5" ry="5" width="300" height="5" />
    <rect x="0" y="25" rx="5" ry="5" width="300" height="5" />
    <rect x="0" y="40" rx="5" ry="5" width="300" height="5" />
    <rect x="0" y="55" rx="5" ry="5" width="300" height="5" />
    <rect x="0" y="70" rx="5" ry="5" width="300" height="5" />
  </ContentLoader>
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
