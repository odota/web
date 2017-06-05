import React, {
  Component,
} from 'react';
import {
  connect,
} from 'react-redux';
import {
  getBenchmark,
} from 'actions';
import Spinner from 'components/Spinner';
import BenchmarkTable from './BenchmarkTable';

const renderBenchmark = (hero, data) => (
  <div>
    <BenchmarkTable data={data} />
  </div>
);

class Benchmark extends Component {

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.heroId) {
      this.props.getBenchmark(this.props.match.params.heroId);
    }
  }


  render() {
    const {
      isLoading,
      isError,
      hero,
      result,
    } = this.props;

    return (
      <div>
        {isLoading || isError || result === null ?
          <Spinner /> : renderBenchmark(hero, result)}
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
