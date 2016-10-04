import React from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import strings from 'lang';
import { IconSteam } from 'components/Icons';
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
  </div>
);

function mapStateToProps(data) {
  return { content: data.content };
}

export default connect(mapStateToProps)(Home);
