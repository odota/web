import React from 'react';
import { connect } from 'react-redux';
import { getPlayerHistogram } from 'actions';
import { playerHistogram } from 'reducers';
// import Heading from 'components/Heading';
import { HistogramGraph } from 'components/Visualizations';
import ButtonGarden from 'components/ButtonGarden';
import histogramNames from 'components/Player/Pages/matchDataColumns';
import { TableFilterForm } from 'components/Form';
import Container from 'components/Container';
import { browserHistory } from 'react-router';

const Histogram = ({ routeParams, columns, playerId, error, loading }) => (
  <div style={{ fontSize: 10 }}>
    <TableFilterForm />
    <ButtonGarden
      onClick={buttonName => browserHistory.push(`/players/${playerId}/histograms/${buttonName}${window.location.search}`)}
      buttonNames={histogramNames}
      selectedButton={routeParams.subInfo || histogramNames[0]}
    />
    <Container error={error} loading={loading}>
      <HistogramGraph columns={columns || []} />
    </Container>
  </div>
);

const getData = (props) => {
  props.getPlayerHistogram(props.playerId, props.location.query, props.routeParams.subInfo || histogramNames[0]);
};

class RequestLayer extends React.Component {
  componentWillMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId
      || this.props.routeParams.subInfo !== nextProps.routeParams.subInfo
      || this.props.location.key !== nextProps.location.key) {
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

export default connect(mapStateToProps, { getPlayerHistogram })(RequestLayer);
