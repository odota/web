import React from 'react';
import { connect } from 'react-redux';
import { getPlayerHistogram } from 'actions';
import { playerHistogram } from 'reducers';
import Heading from 'components/Heading';
import { HistogramGraph } from 'components/Visualizations';
import ButtonGarden from 'components/ButtonGarden';
import dataColumns from 'components/Player/Pages/matchDataColumns';
import Container from 'components/Container';
import { browserHistory } from 'react-router';
import strings from 'lang';

const getMedian = (columns, midpoint) => {
  let sum = 0;
  const medianCol = columns.find((col) => {
    sum += col.games;
    return (sum >= midpoint);
  });
  return medianCol && medianCol.x;
};

const getSubtitleStats = (columns) => {
  const total = columns.reduce((sum, col) => (sum + col.games), 0);
  const median = getMedian(columns, total / 2);
  return `${strings.heading_total_matches}: ${total}${(median !== undefined) ? `, ${strings.heading_median}: ${median}` : ''}`;
};

const histogramNames = dataColumns.filter(col => col !== 'win_rate');

const Histogram = ({ routeParams, columns, playerId, error, loading, histogramName }) => (
  <div style={{ fontSize: 10 }}>
    <Heading title={strings.histograms_name} subtitle={strings.histograms_description} />
    <ButtonGarden
      onClick={(buttonName) => {
        this.histogramName = buttonName;
        browserHistory.push(`/players/${playerId}/histograms/${buttonName}${window.location.search}`);
      }}
      buttonNames={histogramNames}
      selectedButton={routeParams.subInfo || histogramNames[0]}
    />
    <Container style={{ fontSize: 10 }} error={error} loading={loading}>
      <div>
        <Heading title={strings[`heading_${histogramName}`]} subtitle={loading ? '' : getSubtitleStats(columns)} />
        <HistogramGraph columns={columns || []} />
      </div>
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
  histogramName,
  histograms: playerHistogram.getPlayerHistogramById(state, playerId),
  columns: playerHistogram.getHistogramList(histogramName)(state, playerId),
  loading: playerHistogram.getLoading(histogramName)(state, playerId),
  error: playerHistogram.getError(histogramName)(state, playerId),
});

export default connect(mapStateToProps, { getPlayerHistogram })(RequestLayer);
