import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TrendGraph } from '../../../Visualizations';
import { getPlayerTrends } from '../../../../actions';
import ButtonGarden from '../../../ButtonGarden';
import trendNames from '../matchDataColumns';
import Heading from '../../../Heading';
import Container from '../../../Container';

const Trend = ({
  routeParams, columns, playerId, error, loading, history, strings,
}) => {
  const selectedTrend = routeParams.subInfo || trendNames[0];
  return (
    <div>
      <Heading title={strings.trends_name} subtitle={strings.trends_description} />
      <ButtonGarden
        onClick={buttonName => history.push(`/players/${playerId}/trends/${buttonName}${window.location.search}`)}
        buttonNames={trendNames}
        selectedButton={selectedTrend}
      />
      <Container
        error={error}
        loading={loading}
      >
        <TrendGraph
          columns={columns}
          name={selectedTrend}
          onClick={(p) => {
            const matchId = columns[p.index].match_id;
            history.push(`/matches/${matchId}`);
          }}
        />
      </Container>
    </div>
  );
};

Trend.propTypes = {
  routeParams: PropTypes.shape({}),
  columns: PropTypes.arrayOf({}),
  playerId: PropTypes.string,
  error: PropTypes.string,
  loading: PropTypes.bool,
  history: PropTypes.shape({}),
  strings: PropTypes.shape({}),
};

const getData = (props) => {
  const trendName = props.routeParams.subInfo || trendNames[0];
  props.getPlayerTrends(props.playerId, props.location.search, trendName);
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
    return <Trend {...this.props} />;
  }
}

const mapStateToProps = state => ({
  columns: state.app.playerTrends.data,
  loading: state.app.playerTrends.loading,
  error: state.app.playerTrends.error,
  strings: state.app.strings,
});

export default withRouter(connect(mapStateToProps, { getPlayerTrends })(RequestLayer));
