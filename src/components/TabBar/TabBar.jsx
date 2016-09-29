import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { withRouter } from 'react-router';
import styles from './TabBar.css';

const onActive = (tab, router) => {
  router.push(tab.route);
};

const TabBar = ({ router, tabs, activeTab }) => (
  <Tabs
    inkBarStyle={{ backgroundColor: styles.inkBarColor }}
    className={styles.tabs}
    value={activeTab}
  >
    {tabs.map((tab, index) => (
      <Tab
        key={index}
        className={styles.tab}
        value={tab.label.toLowerCase()}
        label={tab.label}
        onActive={() => onActive(tab, router)}
      >
        {tab.children}
      </Tab>
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

// const mapStateToProps = (state) => ({ activeTab: tab.getActiveTab(state) });

// export default connect(mapStateToProps)(withRouter(TabBar));
