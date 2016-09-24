import React from 'react';
import { connect } from 'react-redux';
import { Graph } from 'components/Visualizations';
import { getPlayerHistogram } from 'actions';
import { histogram } from 'reducers';

const getAxis = (name, show) => ({
  label: {
    text: name,
    show,
  },
});

const Histogram = ({ histogramName, columns }) => (
  <div>
    <Graph
      columns={columns}
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

const mapStateToProps = (state, { histogramName }) => ({
  columns: histogram.getColumns(state, histogramName),
});

export default connect(mapStateToProps, { getPlayerHistogram })(RequestLayer);
