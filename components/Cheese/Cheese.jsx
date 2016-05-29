import React from 'react';
import { connect } from 'react-redux';
import { REDUCER_KEY } from '../../reducers';

const Cheese = ({ donations }) => {
  const cheesePercent = donations ? donations.cheese / donations.goal : 0;

  return (
    <div className="row">
      <div className="col-md-4 text-center">
        <p>Buy some cheese. Help pay for servers.</p>
        <p>Reaching the goal every month keeps us running.</p>
      </div>
      <div className="col-md-4 text-center">
        <div className="meter_wrapper">
          <h3 style={{ fontWeight: 700, marginTop: 0 }}>Monthly Cheese Goal</h3>
          <div className="meter">
            <span style={{ width: `${cheesePercent}%` }}>{cheesePercent}</span>
          </div>
        </div>
      </div>
      <div className="col-md-4 text-center">
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
