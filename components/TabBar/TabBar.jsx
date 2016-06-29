import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { withRouter } from 'react-router';
import styles from './TabBar.css';

const getInitialSelectedRoute = (tabs, router) => tabs.findIndex((tab) => router.isActive(tab.route));

const TabBar = ({ router, tabs }) => (
  <Tabs
    inkBarStyle={{ backgroundColor: styles.inkBarColor }}
    initialSelectedIndex={getInitialSelectedRoute(tabs, router)}
    className={styles.tabs}
  >
    {tabs.map((tab, index) => (
      <Tab key={index} className={styles.tab} value={tab.route} label={tab.label} onActive={(tab) => router.push(tab.props.value)} />
    ))}
  </Tabs>
);

export default withRouter(TabBar);
