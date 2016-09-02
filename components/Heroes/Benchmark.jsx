import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import style from './Heroes.css';
import { benchmark } from './../../reducers';
import { getBenchmark } from './../../actions';

import BenchmarkTable from './BenchmarkTable';
import BenchmarkBadge from './BenchmarkBadge';

class Benchmark extends Component {

  componentDidMount() {
    if (this.props.routeParams.hero_id) {
      this.props.getBenchmark(this.props.routeParams.hero_id);
    }
  }

  renderLoading() {
    return (
      <div className={style.Loading}>
        <CircularProgress color="#fff" />
      </div>
    );
  }

  renderBenchmark(hero, data) {
    return (
      <div>
        <BenchmarkBadge hero={hero} />
        <BenchmarkTable data={data} />
      </div>
    );
  }

  render() {
    const { isLoading, isError, hero, result } = this.props;

    return (
      <div>
        {isLoading || isError || result === null ?
          this.renderLoading() : this.renderBenchmark(hero, result)}
      </div>
    );
  }
}
/**
HISTOGRAM API

<Histogram
  title: string
  binWidth: number (px)
>
  <HistogramBin
    height: number (px)
    color: hex
    style: object
  />
  <HistogramLegend
    position: enum
    label: string
    value: array
  />
</Hisogram>


<MultiHistogram>
  <HistogramItem>
  </HistogramItem>
</MultiHistogram>

*/

const mapStateToProps = (state) => ({
  hero: benchmark.getHero(state),
  isLoading: benchmark.getLoading(state),
  isError: benchmark.getError(state),
  result: benchmark.getBenchmarks(state),
});

const mapDispatchToProps = (dispatch) => ({
  getBenchmark: (heroId) => dispatch(getBenchmark(heroId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Benchmark);
