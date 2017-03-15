import React, { PropTypes } from 'react';
import strings from 'lang';
import {
  formatSeconds,
  abbreviateNumber,
  unpackPositionData,
  isRadiant,
} from 'utility';
import { TablePercent, inflictorWithValue } from 'components/Visualizations';
import heroNames from 'dotaconstants/build/hero_names.json';
import Table from 'components/Table';
import Heatmap from 'components/Heatmap';
import { heroTd } from '../matchColumns';
import styles from './styles.css';

const DisplayName = ({ name }) => <div className={styles.DisplayName}>
  {strings[`th_${name}`]}
  <span>
    {name === 'stacked'
      ? strings.tooltip_camps_stacked
      : strings[`tooltip_${name}`]
    }
  </span>
</div>;

DisplayName.propTypes = {
  name: PropTypes.string,
};

const data = player => [{
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
  value: player.stuns
    ? player.stuns.toFixed(2) && '-'
    : '-',
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
}, {
  name: <DisplayName name="biggest_hit" />,
  value: player.max_hero_hit
    ? <div className={styles.biggest_hit}>
      {inflictorWithValue(player.max_hero_hit.inflictor, abbreviateNumber(player.max_hero_hit.value))}
      <span> → </span>
      <img
        src={`${API_HOST}${heroNames[player.max_hero_hit.key].img}`}
        style={{ height: 29 }}
        role="presentation"
      />
    </div>
    : '-',
}];

const columns = [{
  displayName: 'name',
  field: 'name',
}, {
  displayName: 'value',
  field: 'value',
}];

export const playerTab = (player, i, routeParams) => ({
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
      {player.name || player.personaname || strings.general_anonymous}
    </div>
  </div>,
  route: `/matches/${routeParams.matchId}/${routeParams.info}/${player.hero_id}`,
  content: () => <div className={styles.Performances}>
    <Heatmap points={unpackPositionData(player.lane_pos)} />
    <div className={styles.data}>
      <Table
        data={data(player)}
        columns={columns}
      />
    </div>
  </div>,
});
