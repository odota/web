import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { browserHistory } from 'react-router';

  // {overview && <Tab value={overview}}
  // {Object.keys(pages).map((key, index) => (
  //   <Tab value={pages[key]}
  // ))}
const TabBar = () => (
  <Tabs>
    <Tab value="/player/overview" label="overview" onActive={(tab) => browserHistory.push(tab.props.value)} />
    <Tab value="/player/matches" label="matches" onActive={(tab) => browserHistory.push(tab.props.value)} />
    <Tab label="heroes" onActive={(tab) => browserHistory.push(tab.props.value)} />
  </Tabs>
);
export default TabBar;
