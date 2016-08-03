import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import style from './heroes.css';
import { REDUCER_KEY } from './../../reducers';
import { getBenchmark } from './../../actions';

import BenchmarkTable from './BenchmarkTable';
import BenchmarkBadge from './BenchmarkBadge';

class Benchmark extends Component {

  componentDidMount() {
    if (this.props.routeParams.hero_id) {
      this.props.getBenchmark(this.props.routeParams.hero_id);
    }
  }

  render() {
    const { isLoading, isDone, heroes, result, heroId } = this.props;

    return (
      <div>
        {isLoading ?
          <div className={style.Loading}>
            <CircularProgress color="#fff" />
          </div> : ''}

        {isDone ? <div>
          <BenchmarkBadge hero={heroes[heroId]} />
          <BenchmarkTable data={result} />
        </div> : ''}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  heroes: state[REDUCER_KEY].heroes,
  heroId: state[REDUCER_KEY].gotBenchmark.hero_id,
  result: state[REDUCER_KEY].gotBenchmark.result,
  isLoading: state[REDUCER_KEY].gotBenchmark.loading,
  isDone: state[REDUCER_KEY].gotBenchmark.done,
});

const mapDispatchToProps = (dispatch) => ({
  getBenchmark: (heroId) => dispatch(getBenchmark(heroId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Benchmark);
