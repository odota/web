import React from 'react';
import { connect } from 'react-redux';
import { TrendGraph } from 'components/Visualizations';
import { getPlayerMatches } from 'actions';
import { playerMatches } from 'reducers';
import { getCumulativeDataByField } from 'selectors';
import { withRouter } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import { deSnake } from 'utility';
import styles from './Trends.css';
import trendNames from './trendNames';

const selectTrend = (router, trendName, playerId) => {
  router.push(`/players/${playerId}/trends/${trendName}`);
};

const Trend = ({ trendName = trendNames[0], columns, router, playerId }) => (
  <div style={{ fontSize: 10 }}>
    <div className={styles.buttonContainer}>
      {trendNames.map((trend, index) => (
        <FlatButton
          onClick={() => selectTrend(router, trend, playerId)}
          className={trendName === trend ? styles.selectedButton : styles.button}
          key={index}
        >
          <span className={styles.buttonText}>{deSnake(trend)}</span>
        </FlatButton>
      ))}
    </div>
    <TrendGraph
      columns={columns}
      name={deSnake(trendName)}
    />
  </div>
);

const getData = props => {
  props.getPlayerMatches(props.playerId, { project: trendNames }, true);
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
