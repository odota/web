import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import { withRouter } from 'react-router';
import styles from './TabBar.css';
import { tab } from '../../reducers';

const onActive = (tab, router) => {
  router.push(tab.props.value);
};

const TabBar = ({ router, tabs, activeTab }) => (
  <Tabs
    inkBarStyle={{ backgroundColor: styles.inkBarColor }}
    className={styles.tabs}
    value={activeTab}
  >
    {tabs.map((tab, index) => (
      <Tab key={index} className={styles.tab} value={tab.route} label={tab.label} onActive={tab => onActive(tab, router)} />
    ))}
  </Tabs>
);

const mapStateToProps = (state) => ({ activeTab: tab.getActiveTab(state) });

export default connect(mapStateToProps)(withRouter(TabBar));
