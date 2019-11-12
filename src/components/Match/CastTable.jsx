import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Tabs,
  Tab,
} from 'material-ui/Tabs';
import heroes from 'dotaconstants/build/heroes.json';
import { inflictorWithValue } from '../Visualizations';
import Table from '../Table/Table';

const castsColumns = strings => [{
  displayName: strings.th_name,
  field: 'name',
  displayFn: (row, col, field) => (
    <div>
      <span>{inflictorWithValue(field)}</span>
      {/* <span>{items[field] ? items[field].dname : field}</span> */}
    </div>),
}, {
  displayName: strings.th_casts,
  tooltip: strings.tooltip_casts,
  field: 'casts',
  displayFn: (row, col, field) => field || '-',
}, {
  displayName: strings.th_hits,
  tooltip: strings.tooltip_hits,
  field: 'hero_hits',
  displayFn: (row, col, field) => field || '-',
}, {
  displayName: strings.th_damage,
  tooltip: strings.tooltip_damage,
  field: 'damage_inflictor',
  displayFn: (row, col, field) => field || '-',
}];

const getCastArray = (player) => {
  // Get from ability_uses, item_uses
  const resultArray = [];
  const castKeys = ['ability_uses', 'item_uses'];
  castKeys.forEach((castKey) => {
    if (player[castKey]) {
      Object.keys(player[castKey]).forEach((key) => {
        resultArray.push({
          name: key,
          val: player[castKey][key],
          casts: player[castKey][key],
          hero_hits: (player.hero_hits || {})[key],
          damage_inflictor: (player.damage_inflictor || {})[key],
        });
      });
    }
  });
  resultArray.sort((a, b) => b.val - a.val);
  return resultArray;
};

// Deprecated & unused
const CastTable = ({
  match,
  strings,
}) => (
  <Tabs>
    {match.players.map(player =>
      (
        <Tab key={player.player_slot} icon={<img src={heroes[player.hero_id] && process.env.REACT_APP_API_HOST + heroes[player.hero_id].img} height={30} alt="" />}>
          <Table
            data={getCastArray(player)}
            columns={castsColumns(strings)}
          />
        </Tab>
      ))
    }
  </Tabs>);

CastTable.propTypes = {
  match: PropTypes.shape({}),
  strings: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(CastTable);
