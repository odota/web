import React from 'react';
import { connect } from 'react-redux';
import { Graph } from 'components/Visualizations';
import { getPlayerHistogram } from 'actions';
import { playerHistogram } from 'reducers';
import { withRouter } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import { deSnake } from 'utility';
import histogramNames from './histogramNames';
import styles from './Histograms.css';


const getAxis = (name, show = true) => ({
  label: {
    text: name,
    show,
  },
});

const selectHistogram = (router, histogramName, playerId) => {
  router.push(`/players/${playerId}/histograms/${histogramName}`);
};

const Histogram = ({ histogramName = histogramNames[0], columns, router, playerId, ...restProps }) => (
  <div style={{ fontSize: 10 }}>
    {console.log('histogram params', restProps)}
    <div className={styles.buttonContainer}>
      {histogramNames.map((histogram, index) => (
        <FlatButton
          onClick={() => selectHistogram(router, histogram, playerId)}
          className={histogramName === histogram ? styles.selectedButton : styles.button}
          key={index}
        >
          <span className={styles.buttonText}>{deSnake(histogram)}</span>
        </FlatButton>
      ))}
    </div>
    <Graph
      columns={columns}
      name={deSnake(histogramName)}
      type="bar"
      xAxis={getAxis(histogramName)}
      yAxis={getAxis('Matches')}
    />
  </div>
);

const getData = props => {
  props.getPlayerHistogram(props.playerId, props.histogramName || histogramNames[0]);
};

class RequestLayer extends React.Component {
  componentWillMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId || this.props.histogramName !== nextProps.histogramName) {
      getData(nextProps);
    }
  }

  render() {
    return <Histogram {...this.props} />;
  }
}

const mapStateToProps = (state, { histogramName = histogramNames[0], playerId }) => ({
  histograms: playerHistogram.getPlayerHistogramById(state, playerId),
  columns: playerHistogram.getHistogramList(histogramName)(state, playerId),
  loading: playerHistogram.getLoading(histogramName)(state, playerId),
  error: playerHistogram.getError(histogramName)(state, playerId),
});

export default connect(mapStateToProps, { getPlayerHistogram })(withRouter(RequestLayer));
