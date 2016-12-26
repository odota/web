import React, {
  Component,
} from 'react';
import {
  connect,
} from 'react-redux';
import {
  ranking,
} from 'reducers';
import {
  getRanking,
} from 'actions';
import Spinner from 'components/Spinner';
// import style from './Heroes.css';
import RankingTable from './RankingTable';

const renderRanking = (hero, rankings) => (
  <div>
    <RankingTable rankings={rankings} />
  </div>
);

class Ranking extends Component {

  componentDidMount() {
    if (this.props.routeParams && this.props.routeParams.heroId) {
      this.props.getRanking(this.props.routeParams.heroId);
    }
  }

  render() {
    const {
      isLoading,
      isError,
      rankings,
      hero,
    } = this.props;

    return (
      <div>
        {isLoading || isError || rankings === null ?
          <Spinner /> : renderRanking(hero, rankings)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rankings: ranking.getRankings(state),
  isLoading: ranking.getLoading(state),
  isError: ranking.getError(state),
});

const mapDispatchToProps = dispatch => ({
  getRanking: heroId => dispatch(getRanking(heroId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
