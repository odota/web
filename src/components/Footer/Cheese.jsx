import React from 'react';
import { Link } from 'react-router';
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
        <Link to="/carry">
          {strings.app_sponsorship}
        </Link>
      </p>
    </Col>
  </Row>
);
