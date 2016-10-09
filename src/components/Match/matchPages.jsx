import React from 'react';
import {
  formatSeconds,
  // defaultSort,
  isRadiant,
} from 'utility';
import strings from 'lang';
// import { Card } from 'material-ui/Card';
import {
  Tabs,
  Tab,
} from 'material-ui/Tabs';
import Heading from 'components/Heading';
import Table from 'components/Table/Table2';
/*
import {
  createTable,
} from 'components/Table';
import {
  setMatchSort,
} from 'actions';
import {
  getMatch,
  getMatchPlayers,
  getSortState,
  getSortField,
  getSortFn,
} from 'reducers/match';
*/
import VisionMap from './VisionMap';
import CastTable from './CastTable';
import CrossTable from './CrossTable';
import MatchGraph from './MatchGraph';
import BuildingMap from './BuildingMap';
import MatchLog from './MatchLog';
import {
  overviewColumns,
  abilityUpgradeColumns,
  benchmarksColumns,
  overallColumns,
  laningColumns,
  chatColumns,
  purchaseColumns,
  purchaseTimesColumns,
  lastHitsTimesColumns,
  unitKillsColumns,
  actionsColumns,
  runesColumns,
  cosmeticsColumns,
  goldReasonsColumns,
  xpReasonsColumns,
  objectiveDamageColumns,
  analysisColumns,
  teamfightColumns,
  inflictorsColumns,
} from './matchColumns';

const filterMatchPlayers = (players, team = '') =>
  players.filter(player =>
    ((team === 'radiant' && isRadiant(player.player_slot)) || (team === 'dire' && !isRadiant(player.player_slot)) || team === '')
  );

/*
export const sortMatchPlayers = (state, team = '') =>
  defaultSort(filterMatchPlayers(getMatchPlayers(state), team), getSortState(state), getSortField(state), getSortFn(state));
const MatchPlayersTable = createTable(
  getMatch,
  (state, sortState) => (sortState ? sortMatchPlayers(state) : filterMatchPlayers(getMatchPlayers(state))),
  setMatchSort
);
const MatchRadiantPlayersTable = createTable(
  getMatch,
  (state, sortState) => (sortState ? sortMatchPlayers(state, 'radiant') : filterMatchPlayers(getMatchPlayers(state), 'radiant')),
  setMatchSort
);

const MatchDirePlayersTable = createTable(
  getMatch,
  (state, sortState) => (sortState ? sortMatchPlayers(state, 'dire') : filterMatchPlayers(getMatchPlayers(state), 'dire')),
  setMatchSort
);
*/

const MatchPlayersTable = ({
  match,
  columns,
}) => (<Table data={match.players} columns={columns} />);

const MatchRadiantPlayersTable = ({
  match,
  columns,
}) => (<Table data={filterMatchPlayers(match.players, 'radiant')} columns={columns} />);
const MatchDirePlayersTable = ({
  match,
  columns,
}) => (<Table data={filterMatchPlayers(match.players, 'dire')} columns={columns} />);
const MatchPlayersTableSplit = ({
  match,
  columns,
}) => (<div>
  <MatchRadiantPlayersTable match={match} columns={columns} />
  <MatchDirePlayersTable match={match} columns={columns} />
</div>);

const matchPages = [{
  name: strings.tab_overview,
  content: match => (<div>
    <MatchPlayersTableSplit match={match} columns={overviewColumns(match)} />
    <MatchPlayersTable match={match} columns={abilityUpgradeColumns} />
    <BuildingMap match={match} />
  </div>),
}, {
  name: strings.tab_benchmarks,
  content: match => (<div>
    <MatchPlayersTable match={match} columns={benchmarksColumns(match)} />
  </div>),
}, {
  name: strings.tab_performances,
  content: match => (<div>
    <MatchPlayersTable match={match} columns={laningColumns} />
    <MatchPlayersTable match={match} columns={overallColumns} />
  </div>),
}, {
  name: strings.tab_combat,
  content: match => (<div>
    <CrossTable match={match} field1="killed" field2="killed_by" />
    <CrossTable match={match} field1="damage" field2="damage_taken" />
    <MatchPlayersTable match={match} columns={inflictorsColumns} />
  </div>),
}, {
  name: strings.tab_farm,
  content: match => (<div>
    <MatchPlayersTable match={match} columns={unitKillsColumns} />
    <MatchPlayersTable match={match} columns={lastHitsTimesColumns(match)} />
    <MatchPlayersTable match={match} columns={goldReasonsColumns} />
    <MatchPlayersTable match={match} columns={xpReasonsColumns} />
  </div>),
}, {
  name: strings.tab_purchases,
  content: match => (<div>
    <MatchPlayersTable match={match} columns={purchaseColumns} />
    <MatchPlayersTable match={match} columns={purchaseTimesColumns(match)} />
  </div>),
}, {
  name: strings.tab_graphs,
  content: match => (<div>
    <MatchGraph match={match} type="difference" />
    <MatchGraph match={match} type="gold" />
    <MatchGraph match={match} type="xp" />
    <MatchGraph match={match} type="lh" />
  </div>),
}, {
  name: strings.tab_casts,
  content: match => (<div>
    <CastTable match={match} />
  </div>),
}, {
  name: strings.tab_objectives,
  content: match => (<div>
    <MatchPlayersTable match={match} columns={objectiveDamageColumns} />
    <MatchPlayersTable match={match} columns={runesColumns} />
  </div>),
}, {
  name: strings.tab_vision,
  content: match => (<div>
    <VisionMap match={match} />
  </div>),
}, {
  name: strings.tab_actions,
  content: match => (<div>
    <MatchPlayersTable match={match} columns={actionsColumns} />
  </div>),
}, {
  name: strings.tab_teamfights,
  content: match => (
    <div>
      <Heading title={strings.heading_teamfights} />
      <Tabs>
        {(match.teamfights || []).map((teamfight, i) => (
          <Tab
            key={i}
            style={{ backgroundColor: teamfight.radiant_gold_delta >= 0 ? '#66BB6A' : '#ff4c4c' }}
            label={`${formatSeconds(teamfight.start)}, ${teamfight.radiant_gold_delta}`}
          >
            <Table data={teamfight.players.filter(p => p.participate)} columns={teamfightColumns} />
          </Tab>)
        )}
      </Tabs>
    </div>),
}, {
  name: strings.tab_analysis,
  content: match => (<MatchPlayersTable match={match} columns={analysisColumns} />),
}, {
  name: strings.tab_cosmetics,
  content: match => (<div>
    <MatchPlayersTable match={match} columns={cosmeticsColumns} />
  </div>),
}, {
  name: strings.tab_log,
  content: match => (<MatchLog match={match} />),
}, {
  name: strings.tab_chat,
  content: match => (<div>
    <Table data={(match.chat || []).map(c => Object.assign({}, c, match.players[c.slot]))} columns={chatColumns} />
  </div>),
}];

export default matchId => matchPages.map(page => ({
  ...page,
  route: `/matches/${matchId}/${page.name.toLowerCase()}`,
}));
