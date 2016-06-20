import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { withRouter } from 'react-router';
import styles from './TabBar.css';

const TabBar = ({ router, tabs }) => (
  <Tabs inkBarStyle={{ backgroundColor: styles.inkBarColor }}>
    {tabs.map(tab => (
      <Tab className={styles.tab} value={tab.route} label={tab.label} onActive={(tab) => router.push(tab.props.value)} />
    ))}
  </Tabs>
);

export default withRouter(TabBar);
