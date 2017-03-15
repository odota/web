import React, { PropTypes } from 'react';
import strings from 'lang';
import Heatmap from 'components/Heatmap';
import {
  unpackPositionData,
  isRadiant,
  formatSeconds,
} from 'utility';
import TabBar from 'components/TabBar';
import Table from 'components/Table';
import { TablePercent } from 'components/Visualizations';
// import TeamTable from '../TeamTable';
// import performanceColumns from './columns';
import { heroTd } from '../matchColumns';
import styles from './styles.css';

const Performances = ({ match, routeParams }) => {
  const playerTabs = [];
  const route = Number(routeParams.subInfo) || match.players[0].hero_id;

  const DisplayName = ({ name }) => <div className={styles.DisplayName}>
    {strings[`th_${name}`]}
    <span>
      {strings[`tooltip_${name}`]}
    </span>
  </div>;

  DisplayName.propTypes = {
    name: PropTypes.string,
  };

  match.players.map((player, i) => playerTabs.push({
    key: player.hero_id,
    name: <div>
      {heroTd(player, 'hero_id', player.hero_id, i, true)}
      <div
        style={{
          marginTop: 5,
          fontSize: 14,
          fontWeight: 400,
          color: isRadiant(player.player_slot)
            ? styles.green
            : styles.red,
        }}
      >
        {player.personaname}
      </div>
    </div>,
    route: `/matches/${routeParams.matchId}/${routeParams.info}/${player.hero_id}`,
    content: () => <div className={styles.Performances}>
      <Heatmap points={unpackPositionData(player.lane_pos)} />
      <div className={styles.data}>
        <Table
          data={[{
            name: <DisplayName name="lane" />,
            value: strings[`lane_role_${player.lane_role}`],
          }, {
            name: <DisplayName name="lane_efficiency" />,
            value: player.lane_efficiency
              ? <TablePercent
                percent={(player.lane_efficiency * 100).toFixed(2)}
                valEl={`${(player.lane_efficiency * 100).toFixed(2)}%`}
              />
              : '-',
          }, {
            name: <DisplayName name="lhten" />,
            value: player.lh_t[10] || '-',
          }, {
            name: <DisplayName name="dnten" />,
            value: player.dn_t[10] || '-',
          }, {
            name: <DisplayName name="multikill" />,
            value: player.multi_kills_max || '-',
          }, {
            name: <DisplayName name="killstreak" />,
            value: player.kill_streaks_max || '-',
          }, {
            name: <DisplayName name="stuns" />,
            value: player.stuns ? player.stuns.toFixed(2) : '-',
          }, {
            name: <DisplayName name="stacked" />,
            value: player.camps_stacked || '-',
          }, {
            name: <DisplayName name="dead" />,
            value: player.life_state_dead
              ? formatSeconds(player.life_state_dead)
              : '-',
          }, {
            name: <DisplayName name="buybacks" />,
            value: player.buybacks || '-',
          }, {
            name: <DisplayName name="pings" />,
            value: player.pings || '-',
          }]}
          columns={[{
            displayName: 'name',
            field: 'name',
          }, {
            displayName: 'value',
            field: 'value',
          }]}
        />
      </div>
    </div>,
  }));

  const tab = match && playerTabs.find(tab => tab.key === route);

  return (
    <div>
      <TabBar info={route} tabs={playerTabs} />
      {tab && tab.content()}
    </div>
  );
};

Performances.propTypes = {
  match: PropTypes.object,
  routeParams: PropTypes.object,
};

export default Performances;
