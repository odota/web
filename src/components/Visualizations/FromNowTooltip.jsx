import React from 'react';
import PropTypes from 'prop-types';
import { fromNow } from 'utility';
import styles from './FromNowTooltip.css';

const FromNowTooltip = ({ timestamp }) => (
  <div
    className={styles.container}
    data-hint={
      // Country Code Language List http://www.fincher.org/Utilities/CountryLanguageList.shtml
      new Date(Number(timestamp) * 1000).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    }
    data-hint-position="top"
  >
    {fromNow(timestamp)}
  </div>
);

FromNowTooltip.propTypes = {
  timestamp: PropTypes.number,
};

export default FromNowTooltip;
