import React from 'react';
import { connect } from 'react-redux';
import { TrendGraph } from 'components/Visualizations';
import {
  getPlayerMatches,
  defaultPlayerMatchesOptions,
} from 'actions';
import { playerMatches } from 'reducers';
import { getCumulativeDataByField } from 'selectors';
import { deSnake } from 'utility';
import ButtonGarden from 'components/ButtonGarden';
import trendNames from 'components/Player/Pages/matchDataColumns';
// import Heading from 'components/Heading';
import { TableFilterForm } from 'components/Form';
import Container from 'components/Container';
import { browserHistory } from 'react-router';

const Trend = ({ routeParams, columns, playerId, error, loading }) => (
  <div style={{ fontSize: 10 }}>
    <TableFilterForm />
    <ButtonGarden
      onClick={buttonName => browserHistory.push(`/players/${playerId}/trends/${buttonName}${window.location.search}`)}
      buttonNames={trendNames}
      selectedButton={routeParams.subInfo || trendNames[0]}
    />
    <Container error={error} loading={loading}>
      <TrendGraph
        columns={columns}
        name={deSnake(routeParams.subInfo || trendNames[0])}
      />
    </Container>
  </div>
);

const getData = (props) => {
  props.getPlayerMatches(
    props.playerId,
    { ...props.location.query, project: [...trendNames, ...defaultPlayerMatchesOptions.project] },
    true
  );
};

class RequestLayer extends React.Component {
  componentWillMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId || this.props.location.key !== nextProps.location.key) {
      getData(nextProps);
    }
  }

  render() {
    return <Trend {...this.props} />;
  }
}

const mapStateToProps = (state, { trendName = trendNames[0], playerId }) => ({
  columns: getCumulativeDataByField(trendName)(playerId)(state),
  loading: playerMatches.getLoading(state, playerId),
  error: playerMatches.getError(state, playerId),
});

export default connect(mapStateToProps, { getPlayerMatches })(RequestLayer);
