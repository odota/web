import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import strings from 'lang';
import styles from './ButtonGarden.css';

const ButtonGarden = ({ buttonNames, selectedButton, onClick }) => (
  <div className={styles.buttonContainer}>
    {buttonNames.map((buttonName, index) => (
      <FlatButton
        onClick={() => onClick(buttonName)}
        className={selectedButton === buttonName ? styles.selectedButton : styles.button}
        key={index}
      >
        <span className={styles.buttonText}>{strings[`heading_${buttonName}`]}</span>
      </FlatButton>
    ))}
  </div>
);

const { arrayOf, string, func } = PropTypes;

ButtonGarden.propTypes = {
  buttonNames: arrayOf(string),
  selectedButton: string,
  onClick: func,
};

export default ButtonGarden;
