import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';
import strings from 'lang';
import styles from './Home.css';

export default () => (
  <div className={styles.SponsorsContainer}>
    <Row center="xs">
      <Col xs>
        <div className={styles.headline}>
          {strings.home_sponsored_by}
        </div>
        <div className={styles.images}>
          <a href="//www.jist.tv" target="_blank" rel="noopener noreferrer">
            <img src="/assets/images/jist-white-logo.png" role="presentation" />
          </a>
          <a href="//dotacoach.org" target="_blank" rel="noopener noreferrer">
            <img src="/assets/images/dotacoach-32x24.png" role="presentation" />
          </a>
          <a href="//pvgna.com/dota2?ref=yasp" target="_blank" rel="noopener noreferrer">
            <img src="/assets/images/pvgna_logo.png" role="presentation" />
          </a>
          <a href="//dota2.becomethegamer.com/" target="_blank" rel="noopener noreferrer">
            <img src="/assets/images/btg_logo.png" role="presentation" />
          </a>
        </div>
        <div className={styles.Buttons}>
          <FlatButton
            label={strings.become_sponsor}
            href="/"
          />
        </div>
      </Col>
    </Row>
  </div>
);
