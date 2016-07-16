import React from 'react';
import Logo from '../Logo';
import { NavDrawer } from '../NavBar';
import AccountWidget from '../AccountWidget';
import AppBar from 'material-ui/AppBar';
import styles from './Header.css';
import TabBar from '../TabBar';
const playerPages = (accountId) => [
{
  'name': 'Overview',
},
{
  'name': 'Matches',
},
{
  'name': 'Heroes',
},
{
  'name': 'Peers',
},
{
  'name': 'Pros',
},
{
  'name': 'Activity',
},
{
  'name': 'Records',
},
{
  'name': 'Counts',
},
{
  'name': 'Histograms',
},
{
  'name': 'Trends',
},
{
  'name': 'Wardmap',
},
{
  'name': 'Items',
},
{
  'name': 'Wordcloud',
},
{
  'name': 'MMR',
},
{
  'name': 'Rankings',
  'new-feature': true,
}].map((e) => (
  Object.assign(
  {}, e,
  {
    route: `/players/${accountId}/${e.name.toLowerCase()}`,
    label: e.name,
  })
));

const matchPages = (matchId) => [
{
  'name': 'Overview',
},
{
  'name': 'Benchmarks',
},
{
  'name': 'Performances',
  'parsed': true,
},
{
  'name': 'Damage',
  'parsed': true,
},
{
  'name': 'Purchases',
  'parsed': true,
},
{
  'name': 'Farm',
  'parsed': true,
},
{
  'name': 'Combat',
  'parsed': true,
},
{
  'name': 'Graphs',
  'parsed': true,
},
{
  'name': 'Vision',
  'parsed': true,
},
{
  'name': 'Objectives',
  'parsed': true,
},
{
  'name': 'Teamfights',
  'parsed': true,
},
{
  'name': 'Actions',
  'parsed': true,
},
{
  'name': 'Analysis',
  'parsed': true,
},
{
  'name': 'Chat',
  'parsed': true,
}].map((e) => (
  Object.assign(
  {}, e,
  {
    route: `/matches/${matchId}/${e.name.toLowerCase()}`,
    label: e.name,
  }))
);

const getTabBar = (params, location) => {
  if (location.pathname.startsWith('/players')) {
    return (
      <div className={styles.tabBarContainer}>
        <TabBar tabs={playerPages(params.account_id)} />
      </div>);
  } else if (location.pathname.startsWith('/matches')) {
    return (
      <div className={styles.tabBarContainer}>
        <TabBar tabs={matchPages(params.match_id)} />
      </div>);
  }
  return <div className={styles.emptyTabBarContainer} />;
};
export default ({
  openMenu,
  params,
  location,
}) => (
  <div className={styles.upperCase}>
    <AppBar
      className={styles.header}
      iconElementRight={(<AccountWidget />)}
      iconStyleRight={{ marginRight: 0 }}
      title={(<Logo />)}
      onLeftIconButtonTouchTap={() => openMenu()}
      zDepth={0}
    />
    {getTabBar(params, location)}
    <NavDrawer />
  </div>);
