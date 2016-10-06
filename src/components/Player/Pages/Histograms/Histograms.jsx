import React from 'react';
import { connect } from 'react-redux';
import { getPlayerHistogram } from 'actions';
import { playerHistogram } from 'reducers';
import { withRouter } from 'react-router';
import Heading from 'components/Heading';
import { HistogramGraph } from 'components/Visualizations';
import ButtonGarden from 'components/ButtonGarden';
import histogramNames from 'components/Player/Pages/matchDataColumns';

const selectHistogram = (router, playerId) => (histogramName) => {
  router.push(`/players/${playerId}/histograms/${histogramName}`);
};

const Histogram = ({ histogramName = histogramNames[0], columns, router, playerId }) => (
  <div style={{ fontSize: 10 }}>
    <ButtonGarden
      buttonNames={histogramNames}
      selectedButton={histogramName}
      onClick={selectHistogram(router, playerId)}
    />
    <Heading title={histogramName} />
    <HistogramGraph columns={columns} />
  </div>
);

const getData = (props) => {
  props.getPlayerHistogram(props.playerId, props.histogramName || histogramNames[0]);
};

class RequestLayer extends React.Component {
  componentWillMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId || this.props.histogramName !== nextProps.histogramName) {
      getData(nextProps);
    }
  }

  render() {
    return <Histogram {...this.props} />;
  }
}

const mapStateToProps = (state, { histogramName = histogramNames[0], playerId }) => ({
  histograms: playerHistogram.getPlayerHistogramById(state, playerId),
  columns: playerHistogram.getHistogramList(histogramName)(state, playerId),
  loading: playerHistogram.getLoading(histogramName)(state, playerId),
  error: playerHistogram.getError(histogramName)(state, playerId),
});

export default connect(mapStateToProps, { getPlayerHistogram })(withRouter(RequestLayer));
