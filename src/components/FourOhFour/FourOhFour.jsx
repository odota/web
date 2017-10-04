import React from 'react';
import Helmet from 'react-helmet';
import strings from 'lang';

// TODO migrate to styled-components (this component is not currently used)
/*
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
*/
export default () => (
  <div className="container">
    <Helmet title={`${strings.error} 404`} />
    <img src="/assets/images/sad.gif" alt="" />
    <div className="message">
      {strings.error_four_oh_four_message}
    </div>
    <div className="FourOhFour">
      {strings.error} 404
    </div>
  </div>
);
