import React from 'react';
import { Link } from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import { connect } from 'react-redux';
import { REDUCER_KEY } from '../../reducers';
import Spinner from '../Spinner';
import styles from './Cheese.css';
// import CheeseButton from './CheeseButton';
// import RaisedButton from 'material-ui/FlatButton';
import ProgressBar from '../ProgressBar';
import palette from '../palette.css';

const Cheese = ({ donations, error, loading }) => {
  const { goal, cheese } = donations;
  const percent = cheese / goal;

  const getCheeseMeter = () => (
    <div className={styles.content}>
      <ProgressBar height="18" percent={percent} />
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3 className={styles.cheeseTitle}>Monthly Cheese Goal
          <Link to="/carry"><FontIcon className={palette.cheese} /></Link>
        </h3>
        {error && <Error />}
        {loading && <Spinner />}
        { /* TODO - this should be it's own component called cheese meter */
          !error && !loading
          && getCheeseMeter(donations.goal, donations.cheese)
        }
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
