import React from 'react';
import { connect } from 'react-redux';
import { Graph } from 'components/Visualizations';
import { getPlayerHistogram } from 'actions';
import { playerHistogram } from 'reducers';
import { withRouter } from 'react-router';
import histogramNames from './histogramNames';


const getAxis = (name, show = true) => ({
  label: {
    text: name,
    show,
  },
});

const selectHistogram = (router, histogramName, playerId) => {
  router.push(`/players/${playerId}/histograms/${histogramName}`);
};

const Histogram = ({ histogramName, columns, xVals, router, playerId }) => (
  <div style={{ fontSize: 10 }}>
    <div>
      {histogramNames.map(histogram => (
        <button onClick={() => selectHistogram(router, histogram, playerId)}>{histogram }</button>
      ))}
    </div>
    <Graph
      columns={columns}
      name={histogramName}
      xVals={xVals}
      type="bar"
      xAxis={getAxis(histogramName)}
      yAxis={getAxis('Matches')}
    />
  </div>
);

const getData = props => {
  props.getPlayerHistogram(props.playerId, props.histogramName);
};

class RequestLayer extends React.Component {
  componentDidMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId
      || this.props.histogramName !== nextProps.histogramName) {
      getData(nextProps);
    }
  }

  render() {
    return <Histogram {...this.props} />;
  }
}

const mapStateToProps = (state, { histogramName, playerId }) => ({
  histograms: playerHistogram.getData(state, playerId),
  xVals: playerHistogram.getHistogramX(histogramName)(state, playerId),
  columns: playerHistogram.getHistogramY(histogramName)(state, playerId),
});

export default connect(mapStateToProps, { getPlayerHistogram })(withRouter(RequestLayer));
