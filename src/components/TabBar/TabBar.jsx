import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { browserHistory } from 'react-router';
import styles from './TabBar.css';

const onActive = (tab) => {
  browserHistory.push(`${tab.route}${window.location.search}`);
};

const TabBar = ({ router, tabs, info }) => (
  <div className={styles.container}>
    <div className={styles.subContainer}>
      <Tabs
        inkBarStyle={{ backgroundColor: styles.blue }}
        className={styles.tabs}
        value={info}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            className={tab.disabled ? styles.tabDisabled : styles.tab}
            value={tab.key || tab.name.toLowerCase()}
            label={tab.name}
            onActive={() => onActive(tab, router)}
            disabled={tab.disabled}
          />
        ))}
      </Tabs>
    </div>
  </div>
);

const { string, shape, arrayOf } = React.PropTypes;
TabBar.propTypes = {
  router: shape({}),
  tabs: arrayOf(),
  info: string,
};

export default TabBar;
