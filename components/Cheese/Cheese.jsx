import React from 'react';
import { connect } from 'react-redux';
import { REDUCER_KEY } from '../../reducers';
import Spinner from '../Spinner';
import styles from './Cheese.css';
import CheeseButton from './CheeseButton';
import ProgressBar from '../ProgressBar';

const Cheese = ({ donations, error, loading }) => {
  const { goal, cheese } = donations;
  const percent = cheese / goal;

  const getCheeseMeter = () => (
    <div className={styles.content}>
      <ProgressBar height="18" percent={percent} />
      {percent >= 1 && <div> - Woo!!! Thanks guys! No more ads! - Resets in X days.</div>}
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <p className={styles.cheesePromo}>Buy some cheese. Help pay for servers.</p>
        <p className={styles.cheesePromo}>Reaching the goal every month keeps us running.</p>
      </div>
      <div className={styles.section}>
        <h3 className={styles.cheeseTitle}>Monthly Cheese Goal</h3>
          {error && <Error />}
          {loading && <Spinner />}
          { /* TODO - this should be it's own component called cheese meter */
            !error && !loading
            && getCheeseMeter(donations.goal, donations.cheese)
          }
      </div>
      <div className={styles.section}>
        <CheeseButton />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { loading, error, donations } = state[REDUCER_KEY].gotMetadata;

  return {
    loading,
    error,
    donations,
  };
};

export default connect(mapStateToProps)(Cheese);
