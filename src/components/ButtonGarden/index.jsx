import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { withRouter } from 'react-router';
import { deSnake } from 'utility';
import querystring from 'querystring';
import styles from './ButtonGarden.css';

const ButtonGarden = ({ buttonNames, selectedButton, router, basePath }) => (
  <div className={styles.buttonContainer}>
    {buttonNames.map((buttonName, index) => (
      <FlatButton
        onClick={() => {
          router.push({
            pathname: `${basePath}/${buttonName}`,
            query: querystring.parse(window.location.search.substring(1)),
          });
        }}
        className={selectedButton === buttonName ? styles.selectedButton : styles.button}
        key={index}
      >
        <span className={styles.buttonText}>{deSnake(buttonName)}</span>
      </FlatButton>
    ))}
  </div>
);

const { arrayOf, string } = React.PropTypes;

ButtonGarden.propTypes = {
  buttonNames: arrayOf(string),
  selectedButton: string,
  // onClick: func,
};

export default withRouter(ButtonGarden);
