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

const selectTrend = (router, playerId) => (trendName) => {
  router.push(`/players/${playerId}/trends/${trendName}`);
};

const Trend = ({ routeParams, columns, router, playerId }) => (
  <div style={{ fontSize: 10 }}>
    <TableFilterForm submitAction={() => {}} id={this.props.playerId} page="heroes" />
    <ButtonGarden
      buttonNames={trendNames}
      selectedButton={routeParams.subInfo || trendNames[0]}
      onClick={selectTrend(router, playerId)}
    />
    <TrendGraph
      columns={columns}
      name={deSnake(routeParams.subInfo || trendNames[0])}
    />
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
    if (this.props.params.accountId !== nextProps.params.accountId || this.props.location.key !== nextProps.location.key) {
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
