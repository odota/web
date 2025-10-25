import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBenchmark } from '../../actions';
import BenchmarkTable from './BenchmarkTable';
import BenchmarkGraphs from './BenchmarkGraphs';
import BenchmarkSkeleton from '../Skeletons/BenchmarkSkeleton';

class Benchmark extends Component<{
  match: {
    params: {
      heroId: string;
    };
  };
  strings: Strings;
  getBenchmark: Function;
  isLoading: boolean;
  isError: boolean;
  result: any[];
}> {
  componentDidMount() {
    if (this.props.match.params && this.props.match.params.heroId) {
      this.props.getBenchmark(this.props.match.params.heroId);
    }
  }

  render() {
    const { isLoading, isError, result } = this.props;

    return (
      <div>
        {isLoading || isError || result === null ? (
          <BenchmarkSkeleton />
        ) : (
          <div>
            <BenchmarkGraphs data={result} strings={this.props.strings} />
            <BenchmarkTable data={result} />
          </div>
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

const mapStateToProps = (state: any) => ({
  isLoading: state.app.heroBenchmark.loading,
  isError: state.app.heroBenchmark.error,
  result: state.app.heroBenchmark.data.result,
  strings: state.app.strings,
});

const mapDispatchToProps = (dispatch: any) => ({
  getBenchmark: (heroId: string) => dispatch(getBenchmark(heroId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Benchmark);
