import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import constants from '../constants';

const Styled = styled.div`
  .container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
  }

  .message {
    font-weight: var(--fontWeightLight);
    text-align: center;
    font-size: 32px;
    width: 420px;
    margin-top: 20px;
  }

  .FourOhFour {
    background-color: var(--textColorPrimary);
    color: var(--textColorSecondary);
    text-transform: uppercase;
    padding: 6px 10px;
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
    margin: 30px auto 0;
    opacity: 0.6;
  }

  .msg {
    color: ${constants.colorRed};
  }
`;

const imageList = ['sad', 'bawl', 'charm-cry'];

const randomImage = imageList[Math.floor(Math.random() * imageList.length)];

const FourOhFour = ({ strings, msg }) => (
  <Styled>
    <div className="container">
      <Helmet title={`${strings.error} 404`} />
      <img
        src={`/assets/images/${randomImage}.gif`}
        alt="A gif of a pixelized Dota hero crying"
      />
      <div className="message">
        {strings.error_four_oh_four_message}
      </div>
      <div className="msg">
        {msg}
      </div>
      <div className="FourOhFour">
        {strings.error} 404
      </div>
    </div>
  </Styled>
);

const mapStateToProps = state => ({
  strings: state.app.strings,
});

FourOhFour.propTypes = {
  strings: PropTypes.shape({}),
  msg: PropTypes.string,
};

export default connect(mapStateToProps, null)(FourOhFour);
