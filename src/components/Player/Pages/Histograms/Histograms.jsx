import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getPlayerHistograms } from '../../../../actions';
import ButtonGarden from '../../../ButtonGarden';
import Container from '../../../Container';
import Heading from '../../../Heading';
import { HistogramGraph } from '../../../Visualizations';
import dataColumns from '../matchDataColumns';
import { formatGraphValueData } from '../../../../utility';

const getMedian = (columns, midpoint) => {
  let sum = 0;
  const medianCol = columns.find((col) => {
    sum += col.games;
    return (sum >= midpoint);
  });
  return medianCol && medianCol.x;
};

const getSubtitleStats = (columns, strings, histogramName) => {
  const total = columns.reduce((sum, col) => (sum + col.games), 0);
  let median = getMedian(columns, total / 2);
  median = formatGraphValueData(median, histogramName);
  return `(${strings.heading_total_matches}: ${total}${(median !== undefined) ? `, ${strings.heading_median}: ${median})` : ''}`;
};

const getSubtitleDescription = (histogramName, strings) => (strings[`histograms_${histogramName}_description`] || '');

const histogramNames = dataColumns.filter(col => col !== 'win_rate');

const Histogram = ({
  routeParams, columns, playerId, error, loading, histogramName, history, strings,
}) => (
  <div>
    <Heading title={strings.histograms_name} subtitle={strings.histograms_description} />
    <ButtonGarden
      onClick={(buttonName) => {
        history.push(`/players/${playerId}/histograms/${buttonName}${window.location.search}`);
      }}
      buttonNames={histogramNames}
      selectedButton={routeParams.subInfo || histogramNames[0]}
    />
    <Container error={error} loading={loading}>
      <div>
        <Heading
          title={strings[`heading_${histogramName}`]}
          subtitle={loading ? '' : [getSubtitleDescription(histogramName, strings), getSubtitleStats(columns, strings, histogramName)].filter(Boolean).join(' ')}
        />
        <HistogramGraph columns={columns || []} histogramName={histogramName} />
      </div>
    </Container>
  </div>
);

Histogram.propTypes = {
  routeParams: PropTypes.shape({}),
  columns: PropTypes.number,
  playerId: PropTypes.string,
  error: PropTypes.string,
  loading: PropTypes.bool,
  histogramName: PropTypes.string,
  history: PropTypes.shape({}),
  strings: PropTypes.shape({}),
};

const getData = (props) => {
  props.getPlayerHistograms(props.playerId, props.location.search, props.routeParams.subInfo || histogramNames[0]);
};

class RequestLayer extends React.Component {
  static propTypes = {
    playerId: PropTypes.string,
    location: PropTypes.shape({
      key: PropTypes.string,
    }),
    strings: PropTypes.shape({}),
  }

  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.playerId !== prevProps.playerId
      || this.props.location.key !== prevProps.location.key) {
      getData(this.props);
    }
  }

  render() {
    return <Histogram {...this.props} />;
  }
}

const mapStateToProps = (state, { histogramName = histogramNames[0] }) => ({
  histogramName,
  columns: state.app.playerHistograms.data,
  loading: state.app.playerHistograms.loading,
  error: state.app.playerHistograms.error,
  strings: state.app.strings,
});

export default withRouter(connect(mapStateToProps, { getPlayerHistograms })(RequestLayer));
