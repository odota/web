import React from 'react';
import { connect } from 'react-redux';
import { Graph } from 'components/Visualizations';
import { getPlayerMatches } from 'actions';
import { playerMatches } from 'reducers';
import { withRouter } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import { deSnake } from 'utility';
import trendNames from './trendNames';
import styles from './Trends.css';


const getAxis = (name, show = true) => ({
  label: {
    text: name,
    show,
  },
});

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
    <Graph
      columns={columns}
      name={deSnake(trendName)}
      type="line"
      xAxis={getAxis(trendName)}
      yAxis={getAxis('Matches')}
    />
  </div>
);

const getData = props => {
  props.getPlayerMatches(props.playerId);
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
  columns: playerMatches.getTrendList(trendName)(state, playerId),
  loading: playerMatches.getLoading(trendName)(state, playerId),
  error: playerMatches.getError(trendName)(state, playerId),
});

export default connect(mapStateToProps, { getPlayerMatches })(withRouter(RequestLayer));
