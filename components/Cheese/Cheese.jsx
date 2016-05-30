import React from 'react';
import { connect } from 'react-redux';
import { REDUCER_KEY } from '../../reducers';
import Spinner from '../Spinner';
import styles from './Cheese.css';
import LinearProgress from 'material-ui/LinearProgress';

const Cheese = ({ donations, error, loading }) => {
  // const cheesePercent = donations ? donations.cheese / donations.goal : 0;
  const { goal, cheese } = donations;
  const percent = cheese / goal;

  const getCheeseMeter = () => (
    <div>
      <div>{percent * 100}%</div>
      <LinearProgress mode="determinate" value={percent * 100} color="#FFC469" />
      {percent >= 1 && <div> - Woo!!! Thanks guys! No more ads! - Resets in X days.</div>}
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <p>Buy some cheese. Help pay for servers.</p>
        <p>Reaching the goal every month keeps us running.</p>
      </div>
      <div className={styles.section}>
        <div className="meter_wrapper">
          <h3 style={{ fontWeight: 700, marginTop: 0 }}>Monthly Cheese Goal</h3>
          <div>
            {error && <Error />}
            {loading && <Spinner />}
            { /* TODO - this should be it's own component called cheese meter */
              !error && !loading
              && getCheeseMeter(donations.goal, donations.cheese)
            }
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <span style={{ padding: '5px 11px' }} className="flaticon-1 medium-cheese" />
        <a href="/carry" target="_blank">
          <button style={{ marginBottom: '2em', marginLeft: '2em' }} className="btn btn-warning">Help Us Out</button>
        </a>
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
