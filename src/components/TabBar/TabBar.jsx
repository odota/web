import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { withRouter } from 'react-router';
import styles from './TabBar.css';

const onActive = (tab, router) => {
  router.push(tab.route);
};

const TabBar = ({ router, tabs, info }) => (
  <Tabs
    inkBarStyle={{ backgroundColor: styles.inkBarColor }}
    className={styles.tabs}
    value={info}
  >
    {tabs.map((tab, index) => (
      <Tab
        key={index}
        className={styles.tab}
        value={tab.name.toLowerCase()}
        label={tab.name}
        onActive={() => onActive(tab, router)}
      />
    ))}
  </Tabs>
);

const { string, object, array } = React.PropTypes;
TabBar.propTypes = {
  router: object,
  tabs: array,
  activeTab: string,
};

export default withRouter(TabBar);
