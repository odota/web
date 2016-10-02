import React from 'react';
import { connect } from 'react-redux';
import { TrendGraph } from 'components/Visualizations';
import {
  getPlayerMatches,
  defaultPlayerMatchesOptions,
} from 'actions';
import { playerMatches } from 'reducers';
import { getCumulativeDataByField } from 'selectors';
import { withRouter } from 'react-router';
import { deSnake } from 'utility';
import ButtonGarden from 'components/ButtonGarden';
import trendNames from 'components/Player/Pages/matchDataColumns';

const selectTrend = (router, playerId) => trendName => {
  router.push(`/players/${playerId}/trends/${trendName}`);
};

const Trend = ({ trendName = trendNames[0], columns, router, playerId }) => (
  <div style={{ fontSize: 10 }}>
    <ButtonGarden
      buttonNames={trendNames}
      selectedButton={trendName}
      onClick={selectTrend(router, playerId)}
    />
    <TrendGraph
      columns={columns}
      name={deSnake(trendName)}
    />
  </div>
);

const getData = props => {
  props.getPlayerMatches(
    props.playerId,
    { project: [...trendNames, ...defaultPlayerMatchesOptions.project] },
    true
  );
};

class RequestLayer extends React.Component {
  componentWillMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId || this.props.trendName !== nextProps.trendName) {
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

export default connect(mapStateToProps, { getPlayerMatches })(withRouter(RequestLayer));
