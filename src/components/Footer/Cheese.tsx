import React from 'react';
import CheeseCircle from '../Cheese/CheeseCircle';
import useStrings from '../../hooks/useStrings.hook';

const Cheese = () => {
  const strings = useStrings();
  return <div className="cheese">
    <CheeseCircle />
    <section>
      <span style={{ fontSize: 'larger' }}>{strings.app_donation_goal}</span>
      <p style={{ marginTop: 5 }}>
        <a href="//carry.opendota.com">{strings.app_sponsorship}</a>
      </p>
    </section>
  </div>
};

export default Cheese;
