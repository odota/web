import React from 'react';
import { Link } from 'react-router';
import { Row, Col } from 'react-flexbox-grid';
// import EditorAttachMoney from 'material-ui/svg-icons/editor/attach-money';
import CheeseCircle from '../Cheese';
// import styles from './Footer.css';
import strings from 'lang/en';

export default () => (
  <Row middle="xs">
    <Col>
      <CheeseCircle />
    </Col>
    <Col xs>
      <big>{strings.donation_goal}</big>
      <p>
        <Link to="/carry">
          {strings.sponsorship}
        </Link>
      </p>
    </Col>
  </Row>
);
