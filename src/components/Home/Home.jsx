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
                  {strings.login}
                </span>
                <span>
                  {strings.login_desc}
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
                  {strings.parse}
                </span>
                <span>
                  {strings.parse_desc}
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
                  {strings.video}
                </span>
                <span>
                  {strings.video_desc}
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
        {strings.home_why}
      </div>
      <Row around="xs">
        <Col xs={3}>
          <IconOpenSource />
          <div className={styles.headline}>
            {strings.home_opensource_title}
          </div>
          <div className={styles.description}>
            {strings.home_opensource_desc}
          </div>
        </Col>
        <Col xs={3}>
          <IconStatsBars />
          <div className={styles.headline}>
            {strings.home_indepth_title}
          </div>
          <div className={styles.description}>
            {strings.home_indepth_desc}
          </div>
        </Col>
        <Col xs={3}>
          <IconWand />
          <div className={styles.headline}>
            {strings.home_free_title}
          </div>
          <div className={styles.description}>
            {strings.home_free_desc}
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
