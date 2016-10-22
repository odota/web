import React from 'react';
import { Link } from 'react-router';
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
import Table, { TableContainer } from 'components/Table';
import { Row, Col } from 'react-flexbox-grid';
import { IconRadiant, IconDire } from 'components/Icons';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import ActionFingerprint from 'material-ui/svg-icons/action/fingerprint';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import VisionMap from './VisionMap';
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
import pageStyles from './matchPages.css';

const filterMatchPlayers = (players, team = '') =>
  players.filter(player =>
    ((team === 'radiant' && isRadiant(player.player_slot)) || (team === 'dire' && !isRadiant(player.player_slot)) || team === '')
  ).sort((a, b) => a.player_slot - b.player_slot);

const TeamTable = ({
  match,
  columns,
  heading = '',
  className,
}) => (
  <div className={className}>
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

const matchPages = [{
  name: strings.tab_overview,
  content: (match, user) => {
    const firstNumbers = () => {
      if (match.objectives) {
        const tower = match.objectives.findIndex(o => o.type === 'CHAT_MESSAGE_TOWER_KILL');
        const barracks = match.objectives.findIndex(o => o.type === 'CHAT_MESSAGE_BARRACKS_KILL');
        const roshan = match.objectives.findIndex(o => o.type === 'CHAT_MESSAGE_ROSHAN_KILL');
        return (
          <div>
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
      }
      return null;
    };

    return (
      <div>
        <header className={styles.overviewHead}>
          <Row>
            <Col lg={6} xs={12} className={styles.matchButtons}>
              <div>
                <FlatButton
                  label={match.version ? strings.match_button_reparse : strings.match_button_parse}
                  icon={match.version ? <NavigationRefresh /> : <ActionFingerprint />}
                  containerElement={<Link to={`/request#${match.match_id}`}>r</Link>}
                />
                {match.replay_url &&
                <FlatButton
                  label={strings.match_button_replay}
                  icon={<FileFileDownload />}
                  href={match.replay_url}
                  target="_blank"
                  rel="noopener noreferrer"
                />}
                {match.replay_url &&
                <FlatButton
                  label={strings.match_button_video}
                  icon={<img src="/assets/images/jist-24x24.png" role="presentation" />}
                  href={`//www.jist.tv/create.php?dota2-match-url=${match.replay_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                />}
                <FlatButton
                  label={strings.app_dotacoach}
                  icon={<img src="/assets/images/dotacoach-32x24.png" role="presentation" />}
                  href={`//dotacoach.org/Hire/Yasp?matchID=${match.match_id}&userSteamId=${user.account_id}`} // &playerMmr=
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </div>
            </Col>
            <Col lg={6} xs={12} className={styles.matchNumbers}>
              {match.first_blood_time !== undefined &&
              <div>
                <div>
                  <span>{strings.match_first_blood} </span>
                  {formatSeconds(match.first_blood_time)}
                </div>
              </div>}
              {firstNumbers()}
            </Col>
          </Row>
          <hr />
        </header>
        <TeamTable match={match} columns={overviewColumns(match)} heading={strings.heading_overview} />
        <div className={styles.overviewMapGraph}>
          <div className={styles.map}>
            <BuildingMap match={match} />
          </div>
          {match.version &&
          <div className={styles.graph}>
            <MatchGraph match={match} type="difference" />
          </div>}
        </div>
      </div>
    );
  },
}, {
  name: strings.tab_benchmarks,
  content: match => (<div>
    <TeamTable match={match} columns={benchmarksColumns(match)} heading={strings.heading_benchmarks} />
  </div>),
}, {
  name: strings.tab_performances,
  content: match => ([
    <TeamTable match={match} columns={performanceColumns} heading={strings.heading_performances} />,
    (<TeamTable match={match} columns={supportColumns} heading={strings.heading_support} />),
  ]),
}, {
  name: strings.tab_combat,
  content: match => (<div className={pageStyles.container}>
    <TableContainer title={strings.heading_kills} className={pageStyles.tableContainer}>
      <CrossTable match={match} field1="killed" field2="killed_by" />
    </TableContainer>
    <TableContainer title={strings.heading_damage} className={pageStyles.tableContainer}>
      <CrossTable match={match} field1="damage" field2="damage_taken" />
    </TableContainer>
    <TeamTable className={pageStyles.tableContainer} match={match} columns={inflictorsColumns} heading={strings.heading_damage} />
  </div>),
}, {
  name: strings.tab_farm,
  content: match => (<div>
    <TeamTable match={match} columns={unitKillsColumns} heading={strings.heading_unit_kills} />
    <TeamTable match={match} columns={lastHitsTimesColumns(match)} heading={strings.heading_last_hits} />
    <Row>
      <Col md={8}>
        <TeamTable match={match} columns={goldReasonsColumns} heading={strings.heading_gold_reasons} />
      </Col>
      <Col md={4}>
        <TeamTable match={match} columns={xpReasonsColumns} heading={strings.heading_xp_reasons} />
      </Col>
    </Row>
  </div>),
}, {
  name: strings.tab_purchases,
  content: match => (<div>
    <TeamTable match={match} columns={purchaseTimesColumns(match)} heading={strings.heading_purchase_log} />
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
    <Heading title={strings.heading_casts} />
    <CastTable match={match} />
  </div>),
}, {
  name: strings.tab_objectives,
  content: match => (<div>
    <TeamTable match={match} columns={objectiveDamageColumns} heading={strings.heading_objective_damage} />
    <TeamTable match={match} columns={runesColumns} heading={strings.heading_runes} />
  </div>),
}, {
  name: strings.tab_vision,
  content: match => (<div>
    <Heading title={strings.heading_vision} />
    <VisionMap match={match} />
  </div>),
}, {
  name: strings.tab_actions,
  content: match => (<div>
    <TeamTable match={match} columns={actionsColumns} heading={strings.heading_actions} />
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
  content: match => (<div>
    <TeamTable match={match} columns={analysisColumns} heading={strings.heading_analysis} />
  </div>),
}, {
  name: strings.tab_cosmetics,
  content: match => (<div>
    <TeamTable match={match} columns={cosmeticsColumns} heading={strings.heading_cosmetics} />
  </div>),
}, {
  name: strings.tab_log,
  content: match => (<div>
    <Heading title={strings.heading_log} />
    <MatchLog match={match} />
  </div>),
}, {
  name: strings.tab_chat,
  content: match => (<div>
    <Heading title={strings.heading_chat} />
    <Table data={(match.chat || []).map(c => Object.assign({}, c, match.players[c.slot]))} columns={chatColumns} />
  </div>),
}];

export default matchId => matchPages.map(page => ({
  ...page,
  route: `/matches/${matchId}/${page.name.toLowerCase()}`,
}));
