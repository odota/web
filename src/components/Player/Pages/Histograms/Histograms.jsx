import React from 'react';
import { connect } from 'react-redux';
import { Graph } from 'components/Visualizations';
import { getPlayerHistogram } from 'actions';
import { playerHistogram } from 'reducers';

const getAxis = (name, show = true) => ({
  label: {
    text: name,
    show,
  },
});

const Histogram = ({ histogramName, columns, xVals }) => (
  <div style={{ fontSize: 10 }}>
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
    if (this.props.playerId !== nextProps.playerId) {
      getData(this.props);
    }
  }

  render() {
    return <Histogram {...this.props} />;
  }
}

const mapStateToProps = (state, { histogramName, playerId }) => ({
  xVals: playerHistogram.getHistogramX(histogramName)(state, playerId),
  columns: playerHistogram.getHistogramY(histogramName)(state, playerId),
});

export default connect(mapStateToProps, { getPlayerHistogram })(RequestLayer);
