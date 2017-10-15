import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import {
  connect,
} from 'react-redux';
import {
  getRanking,
} from 'actions';
import Spinner from 'components/Spinner';
import RankingTable from './RankingTable';

const renderRanking = (hero, rankings) => (
  <div>
    <RankingTable rankings={rankings} />
  </div>
);

class Ranking extends Component {
  componentDidMount() {
    if (this.props.match.params && this.props.match.params.heroId) {
      this.props.getRanking(this.props.match.params.heroId);
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

Ranking.propTypes = {
  match: PropTypes.string,
  isLoading: PropTypes.string,
  isError: PropTypes.string,
  rankings: PropTypes.string,
  hero: PropTypes.string,
  getRanking: PropTypes.func,
};

const mapStateToProps = state => ({
  rankings: state.app.heroRanking.data.rankings || [],
  isLoading: state.app.heroRanking.loading,
  isError: state.app.heroRanking.error,
});

const mapDispatchToProps = dispatch => ({
  getRanking: heroId => dispatch(getRanking(heroId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
