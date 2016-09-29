import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import ReactTooltip from 'react-tooltip';
import { REDUCER_KEY } from 'reducers';
import Spinner from '../Spinner';
import Error from '../Error';
import { IconCheese } from '../Icons';
import styles from './CheeseCircle.css';

const Cheese = ({ donations, error, loading }) => {
  const { goal, cheese } = donations;
  const percent = ((cheese / goal) * 100).toFixed(2);

  return (
    <div>
      {error && <Error />}
      {loading && <Spinner />}
      {!error && !loading &&
        <div className={styles.progress} data-tip data-for="footerCheese">
          <CircularProgress mode="determinate" value={Math.min(percent, 100)} size={1.5} className={styles.front} />
          <CircularProgress mode="determinate" value={100} size={1.5} className={styles.back} />
          <div className={styles.cheese}>
            <IconCheese className={styles.cheeseGlow} />
            <p className={styles.percent}>
              {(percent < 100) ? cheese : 'Done!'}
            </p>
          </div>
          <ReactTooltip id="footerCheese" place="top" type="light" effect="float">
            <p>${cheese} / ${goal}</p>
          </ReactTooltip>
        </div>
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  const { loading, error, donations } = state[REDUCER_KEY].metadata;

  return {
    loading,
    error,
    donations,
  };
};

export default connect(mapStateToProps)(Cheese);
