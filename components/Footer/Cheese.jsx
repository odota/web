import React from 'react';
import { Link } from 'react-router';
import EditorAttachMoney from 'material-ui/svg-icons/editor/attach-money';
import CheeseCircle from '../Cheese';
import styles from './Footer.css';

export default () => (
  <div className={styles.cheese}>
    <div>
      <CheeseCircle />
    </div>
    <div>
      <big>
        Monthly Cheese Goal
      </big>
      <p>
        Reaching the goal every month keeps us running.
      </p>
      <p className={styles.links}>
        <Link to="/carry">
          <EditorAttachMoney style={{ verticalAlign: 'text-bottom', marginLeft: -5 }} />
          <span>
            Help us out
          </span>
        </Link>
      </p>
    </div>
  </div>
);
