import React from 'react';
import ReactTooltip from 'react-tooltip';
import ActionDoneAll from 'material-ui/svg-icons/action/done-all';
import strings from 'lang';
import styles from './HeroImage.css';

const TableHeroImage = ({ parsed, imageUrl, heroName, subText }) => (
  <div className={styles.container}>
    {parsed && (
      <div className={styles.parsed}>
        <div data-tip data-for="parsed">
          <ActionDoneAll color={styles.blue} className={styles.actionDoneAll} />
          <ReactTooltip id="parsed" place="right" type="light" effect="solid">
            {strings.parsed}
          </ReactTooltip>
        </div>
      </div>
    )}
    <img
      src={imageUrl}
      role="presentation"
      className={styles.image}
    />
    <div className={styles.heroTextContainer}>
      {heroName || 'No hero'}
      {subText && (
        <span className={styles.subText}>
          {subText}
        </span>
      )}
    </div>
  </div>
);

const { number, string, object, oneOfType } = React.PropTypes;

TableHeroImage.propTypes = {
  parsed: number,
  imageUrl: string,
  heroName: string,
  subText: oneOfType([
    string,
    object,
  ]),
};

export default TableHeroImage;
