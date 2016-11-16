import React from 'react';
import {
  formatSeconds,
  isRadiant,
} from 'utility';
import strings from 'lang';
import {
  Tabs,
  Tab,
} from 'material-ui/Tabs';
import Heading from 'components/Heading';
import Table from 'components/Table';
import { IconRadiant, IconDire } from 'components/Icons';
import VisionPage from './VisionPage';
import CastTable from './CastTable';
import CrossTable from './CrossTable';
import MatchGraph from './MatchGraph';
import BuildingMap from './BuildingMap';
import MatchLog from './MatchLog';
import {
  overviewColumns,
  // abilityUpgradeColumns,
  benchmarksColumns,
  performanceColumns,
  supportColumns,
  chatColumns,
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
import styles from './Match.css';

const filterMatchPlayers = (players, team = '') =>
  players.filter(player =>
    ((team === 'radiant' && isRadiant(player.player_slot)) || (team === 'dire' && !isRadiant(player.player_slot)) || team === ''),
  ).sort((a, b) => a.player_slot - b.player_slot);

const TeamTable = ({
  match,
  columns,
  heading = '',
}) => (
  <div>
    <Heading
      title={`${strings.general_radiant} ${heading}`}
      icon={<IconRadiant className={styles.iconRadiant} />}
    />
    <Table data={filterMatchPlayers(match.players, 'radiant')} columns={columns} />
    <Heading
      title={`${strings.general_dire} ${heading}`}
      icon={<IconDire className={styles.iconDire} />}
    />
    <Table data={filterMatchPlayers(match.players, 'dire')} columns={columns} />
  </div>
);

const firstNumbers = (match) => {
  let tower;
  let barracks;
  let roshan;
  if (match.objectives) {
    tower = match.objectives.findIndex(o => o.type === 'CHAT_MESSAGE_TOWER_KILL');
    barracks = match.objectives.findIndex(o => o.type === 'CHAT_MESSAGE_BARRACKS_KILL');
    roshan = match.objectives.findIndex(o => o.type === 'CHAT_MESSAGE_ROSHAN_KILL');
  }
  return (
    <div>
      {match.first_blood_time !== undefined &&
      <div>
        <span>{strings.match_first_blood} </span>
        {formatSeconds(match.first_blood_time)}
      </div>}
      {tower >= 0 &&
      <div>
        <span>{strings.match_first_tower} </span>
        {formatSeconds(match.objectives[tower].time)}
      </div>}
      {barracks >= 0 &&
      <div>
        <span>{strings.match_first_barracks} </span>
        {formatSeconds(match.objectives[barracks].time)}
      </div>}
      {roshan >= 0 &&
      <div>
        <span>{strings.match_first_roshan} </span>
        {formatSeconds(match.objectives[roshan].time)}
      </div>}
    </div>
  );
};

const matchPages = [{
  name: strings.tab_overview,
  key: 'overview',
  content: match => (
    <div>
      <div className={styles.matchNumbers}>
        {firstNumbers(match)}
      </div>
      <TeamTable match={match} columns={overviewColumns(match)} heading={strings.heading_overview} />
      <div className={styles.overviewMapGraph}>
        <div className={`${styles.map} ${!match.version && styles.centeredMap}`}>
          <BuildingMap match={match} />
        </div>
        {match.version &&
        <div className={styles.graph}>
          <MatchGraph match={match} type="difference" />
        </div>}
      </div>
    </div>
  ),
}, {
  name: strings.tab_benchmarks,
  key: 'benchmarks',
  content: match => (<div>
    <TeamTable match={match} columns={benchmarksColumns(match)} heading={strings.heading_benchmarks} />
  </div>),
}, {
  name: strings.tab_performances,
  key: 'performances',
  parsed: true,
  content: match => (<div>
    <TeamTable match={match} columns={performanceColumns} heading={strings.heading_performances} />
    <TeamTable match={match} columns={supportColumns} heading={strings.heading_support} />
  </div>),
}, {
  name: strings.tab_combat,
  key: 'combat',
  parsed: true,
  content: match => (<div>
    <div className={styles.flexContainer}>
      <div className={styles.flexElement}>
        <Heading title={strings.heading_kills} />
        <CrossTable match={match} field1="killed" field2="killed_by" />
      </div>
      <div className={styles.flexElement}>
        <Heading title={strings.heading_damage} />
        <CrossTable match={match} field1="damage" field2="damage_taken" />
      </div>
    </div>
    <TeamTable match={match} columns={inflictorsColumns} heading={strings.heading_damage} />
  </div>),
}, {
  name: strings.tab_farm,
  key: 'farm',
  parsed: true,
  content: match => (<div>
    <TeamTable match={match} columns={unitKillsColumns} heading={strings.heading_unit_kills} />
    <TeamTable match={match} columns={lastHitsTimesColumns(match)} heading={strings.heading_last_hits} />
    <div className={styles.flexContainer}>
      <div className={styles.flexElement}>
        <TeamTable match={match} columns={goldReasonsColumns} heading={strings.heading_gold_reasons} />
      </div>
      <div className={styles.flexElement}>
        <TeamTable match={match} columns={xpReasonsColumns} heading={strings.heading_xp_reasons} />
      </div>
    </div>
  </div>),
}, {
  name: strings.tab_purchases,
  key: 'purchases',
  parsed: true,
  content: match => (<div>
    <TeamTable match={match} columns={purchaseTimesColumns(match)} heading={strings.heading_purchase_log} />
  </div>),
}, {
  name: strings.tab_graphs,
  key: 'graphs',
  parsed: true,
  content: match => (<div>
    <MatchGraph match={match} type="difference" />
    <MatchGraph match={match} type="gold" />
    <MatchGraph match={match} type="xp" />
    <MatchGraph match={match} type="lh" />
  </div>),
}, {
  name: strings.tab_casts,
  key: 'casts',
  parsed: true,
  content: match => (<div>
    <Heading title={strings.heading_casts} />
    <CastTable match={match} />
  </div>),
}, {
  name: strings.tab_objectives,
  key: 'objectives',
  parsed: true,
  content: match => (<div>
    <TeamTable match={match} columns={objectiveDamageColumns} heading={strings.heading_objective_damage} />
    <TeamTable match={match} columns={runesColumns} heading={strings.heading_runes} />
  </div>),
}, {
  name: strings.tab_vision,
  key: 'vision',
  parsed: true,
  content: match => (<div>
    <Heading title={strings.heading_vision} />
    <VisionPage match={match} />
  </div>),
}, {
  name: strings.tab_actions,
  key: 'actions',
  parsed: true,
  content: match => (<div>
    <TeamTable match={match} columns={actionsColumns} heading={strings.heading_actions} />
  </div>),
}, {
  name: strings.tab_teamfights,
  key: 'teamfights',
  parsed: true,
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
          </Tab>),
        )}
      </Tabs>
    </div>),
}, {
  name: strings.tab_analysis,
  key: 'analysis',
  parsed: true,
  content: match => (<div>
    <TeamTable match={match} columns={analysisColumns} heading={strings.heading_analysis} />
  </div>),
}, {
  name: strings.tab_cosmetics,
  key: 'cosmetics',
  parsed: true,
  content: match => (
    <div>
      <Heading title={strings.heading_cosmetics} />
      <Table data={match.players.filter(obj => obj.cosmetics.length > 0)} columns={cosmeticsColumns} />
    </div>
  ),
}, {
  name: strings.tab_log,
  key: 'log',
  parsed: true,
  content: match => (<div>
    <Heading title={strings.heading_log} />
    <MatchLog match={match} />
  </div>),
}, {
  name: strings.tab_chat,
  key: 'chat',
  parsed: true,
  content: match => (<div>
    <Heading title={strings.heading_chat} />
    <Table data={(match.chat || []).map(c => Object.assign({}, c, match.players[c.slot]))} columns={chatColumns} />
  </div>),
}];

export default (matchId, match) => matchPages.map(page => ({
  ...page,
  route: `/matches/${matchId}/${page.name.toLowerCase()}`,
  disabled: match && !match.version && page.parsed,
}));
