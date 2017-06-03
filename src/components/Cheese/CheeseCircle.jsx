import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import Spinner from '../Spinner';
import Error from '../Error';
import { IconCheese } from '../Icons';
import styles from './CheeseCircle.css';

const Cheese = ({ donations = {}, error, loading }) => {
  const { goal, cheese } = donations;
  const percent = ((cheese / goal) * 100) || 0;

  return (
    <div>
      {error && <Error />}
      {loading && <Spinner />}
      {!error && !loading &&
      <div className={styles.progress} data-hint={`${cheese} / ${goal}`}>
        <CircularProgress mode="determinate" value={Math.min(percent, 100)} size={90} className={styles.front} />
        <CircularProgress mode="determinate" value={100} size={90} className={styles.back} />
        <div className={styles.cheese}>
          <IconCheese />
          <p className={styles.percent}>
            {`${percent.toFixed(0)}%`}
          </p>
        </div>
      </div>
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  const { loading, error } = state.app.metadata;
  return {
    loading,
    error,
    donations: state.app.metadata.data.cheese,
  };
};

export default connect(mapStateToProps)(Cheese);
