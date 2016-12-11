import React from 'react';
import { connect } from 'react-redux';
import { TrendGraph } from 'components/Visualizations';
import {
  getPlayerTrends,
} from 'actions';
import { playerTrends } from 'reducers';
import ButtonGarden from 'components/ButtonGarden';
import trendNames from 'components/Player/Pages/matchDataColumns';
// import Heading from 'components/Heading';
import { TableFilterForm } from 'components/Form';
import Container from 'components/Container';
import { browserHistory } from 'react-router';
import strings from 'lang';

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
        name={strings[`heading_${routeParams.subInfo || trendNames[0]}`]}
      />
    </Container>
  </div>
);

const getData = (props) => {
  const trendName = props.routeParams.subInfo || trendNames[0];
  props.getPlayerTrends(
    props.playerId,
    { ...props.location.query, limit: 500, project: [trendName, 'hero_id'] },
    trendName,
  );
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
    return <Trend {...this.props} />;
  }
}

const mapStateToProps = (state, { playerId }) => ({
  columns: playerTrends.getPlayerTrends(state, playerId),
  loading: playerTrends.getLoading(state, playerId),
  error: playerTrends.getError(state, playerId),
});

export default connect(mapStateToProps, { getPlayerTrends })(RequestLayer);
