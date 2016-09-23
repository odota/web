import React from 'react';
import ReactTooltip from 'react-tooltip';
import ActionDoneAll from 'material-ui/svg-icons/action/done-all';

import styles from './TableHeroImage.css';

const TableHeroImage = ({ parsed, imageUrl, heroName, subText }) => (
  <div className={styles.container}>
    {parsed && (
      <div className={styles.parsed}>
        <div data-tip data-for="parsed">
          <ActionDoneAll color={styles.blue} className={styles.actionDoneAll} />
        </div>
        <ReactTooltip id="parsed" place="top" type="light" effect="float">
          Replay has been parsed for additional statistics
        </ReactTooltip>
      </div>
    )}
    <img
      src={imageUrl}
      role="presentation"
      className={styles.image}
    />
    <div className={styles.heroTextContainer}>
      {heroName}
      {subText && (
        <span className={styles.subText}>
          {subText}
        </span>
      )}
    </div>
  </div>
);

const { bool, string } = React.PropTypes;

TableHeroImage.propTypes = {
  parsed: bool,
  imageUrl: string,
  heroName: string,
  subText: string,
};

export default TableHeroImage;
