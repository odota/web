import React, { Component } from 'react';
import { shape, func, bool, arrayOf, oneOfType, string } from 'prop-types';
import { connect } from 'react-redux';
import ContentLoader from 'react-content-loader';
import { getBenchmark } from '../../actions';
import BenchmarkTable from './BenchmarkTable';

const renderBenchmark = (hero, data) => (
  <div>
    <BenchmarkTable data={data} />
  </div>
);

const BenchmarkSkeleton = props => (
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

class Benchmark extends Component {
  static propTypes = {
    match: shape({
      params: shape({
        heroId: string,
      }),
    }),
    getBenchmark: func,
    isLoading: bool,
    isError: bool,
    hero: shape({}),
    result: oneOfType([
      arrayOf(shape({})),
      shape({}),
    ]),
  }

  componentDidMount() {
    if (
      this.props.match.params &&
      this.props.match.params.heroId
    ) {
      this.props.getBenchmark(this.props.match.params.heroId);
    }
  }

  render() {
    const {
      isLoading, isError, hero, result,
    } = this.props;

    return (
      <div>
        {isLoading || isError || result === null ? (
          <BenchmarkSkeleton />
        ) : (
          renderBenchmark(hero, result)
        )}
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

const mapStateToProps = state => ({
  isLoading: state.app.heroBenchmark.loading,
  isError: state.app.heroBenchmark.error,
  result: state.app.heroBenchmark.data.result,
});

const mapDispatchToProps = dispatch => ({
  getBenchmark: heroId => dispatch(getBenchmark(heroId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Benchmark);
