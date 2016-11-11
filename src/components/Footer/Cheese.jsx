import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import strings from 'lang';
// import EditorAttachMoney from 'material-ui/svg-icons/editor/attach-money';
import CheeseCircle from '../Cheese';
// import styles from './Footer.css';

export default () => (
  <Row middle="xs">
    <Col>
      <CheeseCircle />
    </Col>
    <Col xs>
      <big>
        {strings.app_donation_goal}
      </big>
      <p style={{ marginTop: 5 }}>
        <a href="//carry.opendota.com">
          {strings.app_sponsorship}
        </a>
      </p>
    </Col>
  </Row>
);
