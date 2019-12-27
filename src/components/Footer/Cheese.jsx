import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CheeseCircle from '../Cheese';

const Cheese = ({ strings }) => (
  <div className="cheese">
    <CheeseCircle />
    <section>
      <span style={{ fontSize: 'larger' }} >
        {strings.app_donation_goal}
      </span>
      <p style={{ marginTop: 5 }}>
        <a href="//carry.opendota.com">
          {strings.app_sponsorship}
        </a>
      </p>
    </section>
  </div>
);

Cheese.propTypes = {
  strings: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Cheese);
