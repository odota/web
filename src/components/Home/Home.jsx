import React from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { Row, Col } from 'react-flexbox-grid';
import strings from 'lang';
import { IconSteam, IconOpenSource, IconStatsBars, IconWand } from 'components/Icons';
import styles from './Home.css';

const Home = () => (
  <div>
    <div className={styles.HeadContainer}>
      <div className={styles.headline}>
        {strings.app_name}
      </div>
      <div className={styles.description}>
        {strings.app_description}
      </div>
      <div className={styles.Buttons}>
        <div>
          <FlatButton
            label={
              <span className={styles.label}>
                <span>
                  Login
                </span>
                <span>
                  start parsng my matches
                </span>
              </span>
            }
            icon={<IconSteam />}
          />
        </div>
        <div>
          <FlatButton
            label={
              <span className={styles.label}>
                <span>
                  Parse
                </span>
                <span>
                  a match by ID
                </span>
              </span>
            }
          />
        </div>
        <div>
          <FlatButton
            label={
              <span className={styles.label}>
                <span>
                  Get a video
                </span>
                <span>
                  of your match with
                </span>
              </span>
            }
            labelPosition="before"
            icon={
              <img
                src="/assets/images/jist-white-logo.png"
                role="presentation"
                height={24}
              />
            }
          />
        </div>
      </div>
    </div>
    <div className={styles.AwesomeContainer}>
      <div className={styles.why}>
        Why We're Awesome
      </div>
      <Row around="xs">
        <Col xs={3}>
          <IconOpenSource />
          <div className={styles.headline}>
            Open Source
          </div>
          <div className={styles.description}>
            All of our code is open source and available on GitHub for contributors to improve and modify.
          </div>
        </Col>
        <Col xs={3}>
          <IconStatsBars />
          <div className={styles.headline}>
            In-Depth Statistics
          </div>
          <div className={styles.description}>
            We parse replay files to provide highly detailed match statistics.
          </div>
        </Col>
        <Col xs={3}>
          <IconWand />
          <div className={styles.headline}>
            Free of charge
          </div>
          <div className={styles.description}>
            Our servers are paid for by donations and development is done by volunteers, so we don't charge users anything.
          </div>
        </Col>
      </Row>
    </div>
    {/* Add some screenshots with description */}
  </div>
);

function mapStateToProps(data) {
  return { content: data.content };
}

export default connect(mapStateToProps)(Home);
