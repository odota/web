import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getPlayerHistograms } from '../../../../actions';
import ButtonGarden from '../../../ButtonGarden/ButtonGarden';
import Container from '../../../Container/Container';
import Heading from '../../../Heading/Heading';
import { HistogramGraph } from '../../../Visualizations';
import dataColumns from '../matchDataColumns';
import { formatGraphValueData } from '../../../../utility';
import useStrings from '../../../../hooks/useStrings.hook';

const getMedian = (columns: any[], midpoint: number) => {
  let sum = 0;
  const medianCol = columns.find((col) => {
    sum += col.games;
    return sum >= midpoint;
  });
  return medianCol && medianCol.x;
};

const getSubtitleStats = (
  columns: any[],
  strings: Strings,
  histogramName: string,
) => {
  const total = columns.reduce((sum, col) => sum + col.games, 0);
  let median = getMedian(columns, total / 2);
  median = formatGraphValueData(median, histogramName);
  return `(${strings.heading_total_matches}: ${total}${median !== undefined ? `, ${strings.heading_median}: ${median})` : ''}`;
};

const getSubtitleDescription = (histogramName: string, strings: Strings) =>
  strings[`histograms_${histogramName}_description` as keyof Strings] || '';

const histogramNames = dataColumns.filter((col) => col !== 'win_rate');

const Histogram = ({
  routeParams,
  columns,
  playerId,
  error,
  loading,
  histogramName,
  history,
}: HistogramsProps) => {
  const strings = useStrings();
  return (
    <div>
      <Heading
        title={strings.histograms_name}
        subtitle={strings.histograms_description}
      />
      <ButtonGarden
        onClick={(buttonName: string) => {
          history.push(
            `/players/${playerId}/histograms/${buttonName}${window.location.search}`,
          );
        }}
        buttonNames={histogramNames}
        selectedButton={routeParams.subInfo || histogramNames[0]}
      />
      <Container error={error} loading={loading}>
        <div>
          <Heading
            title={strings[`heading_${histogramName}` as keyof Strings]}
            subtitle={
              loading
                ? ''
                : [
                    getSubtitleDescription(histogramName, strings),
                    getSubtitleStats(columns, strings, histogramName),
                  ]
                    .filter(Boolean)
                    .join(' ')
            }
          />
          <HistogramGraph
            columns={columns || []}
            histogramName={histogramName}
          />
        </div>
      </Container>
    </div>
  );
};

const getData = (props: HistogramsProps) => {
  props.getPlayerHistograms(
    props.playerId,
    props.location.search,
    props.routeParams.subInfo || histogramNames[0],
  );
};

type HistogramsProps = {
  routeParams: any;
  playerId: string;
  getPlayerHistograms: Function;
  columns: any[];
  error: string;
  loading: boolean;
  histogramName: string;
} & RouterProps;

class HistogramsPage extends React.Component<HistogramsProps> {
  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps: HistogramsProps) {
    if (
      this.props.playerId !== prevProps.playerId ||
      this.props.location.key !== prevProps.location.key
    ) {
      getData(this.props);
    }
  }

  render() {
    return <Histogram {...this.props} />;
  }
}

const mapStateToProps = (
  state: any,
  { histogramName = histogramNames[0] },
) => ({
  histogramName,
  columns: state.app.playerHistograms.data,
  loading: state.app.playerHistograms.loading,
  error: state.app.playerHistograms.error,
});

export default withRouter(
  connect(mapStateToProps, { getPlayerHistograms })(HistogramsPage),
);
