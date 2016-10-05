import React from 'react';
import {
  formatSeconds,
} from 'utility';
import strings from 'lang';
// import { Card } from 'material-ui/Card';
import {
  Tabs,
  Tab,
} from 'material-ui/Tabs';
import Heading from 'components/Heading';
import Table, {
  createTable,
} from 'components/Table';
import {
  setMatchSort,
} from 'actions';
import {
  getMatchData,
  sortMatchPlayers,
  getMatchPlayers,
} from 'reducers/match';
import VisionMap from './VisionMap';
import CastTable from './CastTable';
import CrossTable from './CrossTable';
import MatchGraph from './MatchGraph';
import BuildingMap from './BuildingMap';
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
  logColumns,
  analysisColumns,
  teamfightColumns,
  inflictorsColumns,
} from './matchColumns';
import generateLog from './generateLog';

const MatchPlayersTable = createTable(
  getMatchData,
  (state, sortState) => (sortState ? sortMatchPlayers(state) : getMatchPlayers(state)),
  setMatchSort
);

const matchPages = [{
  name: strings.tab_overview,
  content: match => (<div>
    <MatchPlayersTable columns={overviewColumns(match)} />
    <MatchPlayersTable columns={abilityUpgradeColumns} />
    <BuildingMap match={match} />
  </div>),
}, {
  name: strings.tab_benchmarks,
  content: match => (<div>
    <MatchPlayersTable columns={benchmarksColumns(match)} />
  </div>),
}, {
  name: strings.tab_performances,
  content: () => (<div>
    <MatchPlayersTable columns={laningColumns} />
    <MatchPlayersTable columns={overallColumns} />
  </div>),
}, {
  name: strings.tab_combat,
  content: match => (<div>
    <CrossTable match={match} field1="killed" field2="killed_by" />
    <CrossTable match={match} field1="damage" field2="damage_taken" />
    <MatchPlayersTable columns={inflictorsColumns} />
  </div>),
}, {
  name: strings.tab_farm,
  content: match => (<div>
    <MatchPlayersTable columns={unitKillsColumns} />
    <MatchPlayersTable columns={lastHitsTimesColumns(match)} />
    <MatchPlayersTable columns={goldReasonsColumns} />
    <MatchPlayersTable columns={xpReasonsColumns} />
  </div>),
}, {
  name: strings.tab_purchases,
  content: match => (<div>
    <MatchPlayersTable columns={purchaseColumns} />
    <MatchPlayersTable columns={purchaseTimesColumns(match)} />
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
  content: () => (<div>
    <MatchPlayersTable columns={objectiveDamageColumns} />
    <MatchPlayersTable columns={runesColumns} />
  </div>),
}, {
  name: strings.tab_vision,
  content: match => (<div>
    <VisionMap match={match} />
  </div>),
}, {
  name: strings.tab_actions,
  content: () => (<div>
    <MatchPlayersTable columns={actionsColumns} />
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
  content: () => (<MatchPlayersTable columns={analysisColumns} />),
}, {
  name: strings.tab_cosmetics,
  content: () => (<div>
    <MatchPlayersTable columns={cosmeticsColumns} />
  </div>),
}, {
  name: strings.tab_log,
  content: match => (<div>
    <Table data={generateLog(match)} columns={logColumns} />
  </div>),
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
