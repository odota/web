import React from 'react';
import PropTypes from 'prop-types';
import heroes from 'dotaconstants/build/heroes.json';
import Heading from '../Heading';
import Table from '../Table';
import TeamfightMap from '../Match/TeamfightMap';
import Purchases from '../Match/Purchases';
import Timeline from '../Match/Overview/Timeline';
import MatchGraph from '../Visualizations/Graph/MatchGraph';
import StackedBarGraph from '../Visualizations/Graph/StackedBarGraph';
import Draft from './Draft';
import Vision from './Vision';
import Laning from './Laning';
import CrossTable from './CrossTable';
import MatchLog from './MatchLog';
import MatchStory from './MatchStory';
import mcs from './matchColumns';
import Overview from './Overview';
import TeamTable from './TeamTable';
import Chat from './Chat';
import { StyledFlexContainer, StyledFlexElement } from './StyledMatch';
import { getHeroImageUrl, IMAGESIZE_ENUM } from '../../utility';
import config from '../../config';

const TickElement = (props) => {
  const { x, y, payload } = props;

  if (heroes[payload.value]) {
    const href = getHeroImageUrl(payload.value, IMAGESIZE_ENUM.SMALL.suffix);
    const imageProps = {
      xlinkHref: href,
      href,
      width: IMAGESIZE_ENUM.SMALL.width,
      height: IMAGESIZE_ENUM.SMALL.height,
      x: (x - (IMAGESIZE_ENUM.SMALL.width / 2)),
      y,
    };

    return <image {...imageProps} />;
  }

  return null;
};
TickElement.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.shape({}),
};


const matchPages = (strings) => {
  const {
    benchmarksColumns,
    performanceColumns,
    lastHitsTimesColumns,
    unitKillsColumns,
    actionsColumns,
    runesColumns,
    cosmeticsColumns,
    // goldReasonsColumns,
    // xpReasonsColumns,
    objectiveDamageColumns,
    analysisColumns,
    inflictorsColumns,
    castsColumns,
    fantasyColumns,
  } = mcs(strings);

  const gosuUrl = 'https://gosu.ai/dota/?utm_source=opendota&utm_medium=cpc&utm_campaign=';
  const gosuIcon = '/assets/images/gosu-24px.png';

  return [Overview(strings, gosuUrl, gosuIcon), {
    name: strings.tab_benchmarks,
    key: 'benchmarks',
    content: match => (
      <div>
        <TeamTable
          players={match.players}
          columns={benchmarksColumns(match)}
          heading={strings.heading_benchmarks}
          buttonLabel={config.VITE_ENABLE_GOSUAI ? strings.gosu_benchmarks : null}
          buttonTo={`${gosuUrl}Benchmarks`}
          buttonIcon={gosuIcon}
          radiantTeam={match.radiant_team}
          direTeam={match.dire_team}
          radiantWin={match.radiant_win}
          hoverRowColumn
        />
      </div>),
  }, {
    name: strings.tab_drafts,
    key: 'draft',
    parsed: true,
    hidden: match => match.game_mode !== 2,
    content: match => (
      <div>
        <Draft
          gameMode={match.game_mode}
          radiantTeam={match.radiant_team}
          direTeam={match.dire_team}
          draft={match.draft_timings}
          startTime={match.start_time}
          sponsorIcon={gosuIcon}
          sponsorURL={gosuUrl}
          strings={strings}
        />
      </div>),
  }, {
    name: strings.tab_performances,
    key: 'performances',
    parsed: true,
    content: match => (
      <div>
        <TeamTable
          players={match.players}
          columns={performanceColumns}
          heading={strings.heading_performances}
          buttonLabel={config.VITE_ENABLE_GOSUAI ? strings.gosu_performances : null}
          buttonTo={`${gosuUrl}Performances`}
          buttonIcon={gosuIcon}
          radiantTeam={match.radiant_team}
          direTeam={match.dire_team}
          radiantWin={match.radiant_win}
          summable
          hoverRowColumn
        />
      </div>),
  }, {
    name: strings.tab_laning,
    key: 'laning',
    parsed: true,
    content: match => (
      <div>
        <Laning match={match} sponsorURL={gosuUrl} sponsorIcon={gosuIcon} />
      </div>),
  }, {
    name: strings.tab_combat,
    key: 'combat',
    skeleton: true,
    parsed: true,
    content: match => (
      <div>
        {config.VITE_ENABLE_GOSUAI &&
        <Heading
          buttonLabel={strings.gosu_combat}
          buttonTo={`${gosuUrl}Combat`}
          buttonIcon={gosuIcon}
        />
        }
        <StyledFlexContainer>
          <StyledFlexElement>
            <Heading title={strings.heading_kills} />
            <CrossTable match={match} field1="killed" field2="killed_by" />
          </StyledFlexElement>
          <StyledFlexElement>
            <Heading title={strings.heading_damage} />
            <CrossTable match={match} field1="damage" field2="damage_taken" />
          </StyledFlexElement>
        </StyledFlexContainer>
        <TeamTable
          players={match.players}
          columns={inflictorsColumns}
          heading={strings.heading_damage}
          radiantTeam={match.radiant_team}
          direTeam={match.dire_team}
          radiantWin={match.radiant_win}
        />
      </div>),
  }, {
    name: strings.tab_farm,
    key: 'farm',
    skeleton: true,
    parsed: true,
    content: match => (
      <div>
        <TeamTable
          players={match.players}
          columns={unitKillsColumns}
          heading={strings.heading_unit_kills}
          buttonLabel={config.VITE_ENABLE_GOSUAI ? strings.gosu_farm : null}
          buttonTo={`${gosuUrl}Farm`}
          buttonIcon={gosuIcon}
          radiantTeam={match.radiant_team}
          direTeam={match.dire_team}
          radiantWin={match.radiant_win}
          summable
          hoverRowColumn
        />
        <TeamTable
          players={match.players}
          columns={lastHitsTimesColumns(match)}
          heading={strings.heading_last_hits}
          radiantTeam={match.radiant_team}
          direTeam={match.dire_team}
          radiantWin={match.radiant_win}
          summable
          hoverRowColumn
        />
        <StackedBarGraph
          columns={match.players.map(player => ({ ...player.gold_reasons, name: player.hero_id }))}
          heading={strings.heading_gold_reasons}
          type="gold_reasons"
          tooltipFormatter={heroId => heroes[heroId] && heroes[heroId].localized_name}
          tickElement={TickElement}
        />
        <StackedBarGraph
          columns={match.players.map(player => ({ ...player.xp_reasons, name: player.hero_id }))}
          heading={strings.heading_xp_reasons}
          type="xp_reasons"
          tooltipFormatter={heroId => heroes[heroId] && heroes[heroId].localized_name}
          tickElement={TickElement}
        />
        {/*
      <TeamTable
        players={match.players}
        columns={goldReasonsColumns}
        heading={strings.heading_gold_reasons}
        radiantTeam={match.radiant_team}
        direTeam={match.dire_team}
        radiantWin={match.radiant_win}
      />
      <TeamTable
        players={match.players}
        columns={xpReasonsColumns}
        heading={strings.heading_xp_reasons}
        radiantTeam={match.radiant_team}
        direTeam={match.dire_team}
        radiantWin={match.radiant_win}
      />
      */}
      </div>),
  }, {
    name: strings.tab_items,
    key: 'purchases',
    skeleton: true,
    parsed: true,
    content: match => (
      <div>
        <Purchases
          match={match}
          sponsorURL={gosuUrl}
          sponsorIcon={gosuIcon}
        />
      </div>),
  }, {
    name: strings.tab_graphs,
    key: 'graphs',
    skeleton: true,
    parsed: true,
    content: match => (
      <div>
        <Timeline match={match} />
        <MatchGraph match={match} type="difference" sponsorURL={gosuUrl} sponsorIcon={gosuIcon} />
        <MatchGraph match={match} type="gold" />
        <MatchGraph match={match} type="xp" />
        <MatchGraph match={match} type="lh" />
      </div>),
  }, {
    name: strings.tab_casts,
    key: 'casts',
    skeleton: true,
    parsed: true,
    content: match => (
      <div>
        <TeamTable
          players={match.players}
          columns={castsColumns}
          heading={strings.heading_casts}
          buttonLabel={config.VITE_ENABLE_GOSUAI ? strings.gosu_default : null}
          buttonTo={`${gosuUrl}Casts`}
          buttonIcon={gosuIcon}
          radiantTeam={match.radiant_team}
          direTeam={match.dire_team}
          radiantWin={match.radiant_win}
        />
      </div>),
  }, {
    name: strings.tab_objectives,
    key: 'objectives',
    skeleton: true,
    parsed: true,
    content: match => (
      <div>
        <TeamTable
          players={match.players}
          columns={objectiveDamageColumns}
          heading={strings.heading_objective_damage}
          buttonLabel={config.VITE_ENABLE_GOSUAI ? strings.gosu_default : null}
          buttonTo={`${gosuUrl}Objectives`}
          buttonIcon={gosuIcon}
          radiantTeam={match.radiant_team}
          direTeam={match.dire_team}
          radiantWin={match.radiant_win}
          hoverRowColumn
        />
        <TeamTable
          players={match.players}
          columns={runesColumns}
          heading={strings.heading_runes}
          radiantTeam={match.radiant_team}
          direTeam={match.dire_team}
          radiantWin={match.radiant_win}
          hoverRowColumn
        />
      </div>),
  }, {
    name: strings.tab_vision,
    key: 'vision',
    skeleton: true,
    parsed: true,
    content: match => <Vision match={match} sponsorURL={gosuUrl} sponsorIcon={gosuIcon} hoverRowColumn />,
  }, {
    name: strings.tab_actions,
    key: 'actions',
    parsed: true,
    content: match => (
      <div>
        <TeamTable
          players={match.players}
          columns={actionsColumns}
          heading={strings.heading_actions}
          buttonLabel={config.VITE_ENABLE_GOSUAI ? strings.gosu_actions : null}
          buttonTo={`${gosuUrl}Actions`}
          buttonIcon={gosuIcon}
          radiantTeam={match.radiant_team}
          direTeam={match.dire_team}
          radiantWin={match.radiant_win}
          hoverRowColumn
        />
      </div>),
  }, {
    name: strings.tab_teamfights,
    key: 'teamfights',
    skeleton: true,
    parsed: true,
    content: match => (
      <div>
        <TeamfightMap teamfights={match.teamfights} match={match} sponsorURL={gosuUrl} sponsorIcon={gosuIcon} hoverRowColumn />
      </div>),
  }, {
    name: strings.tab_analysis,
    key: 'analysis',
    parsed: true,
    content: match => (
      <div>
        <TeamTable
          players={match.players}
          columns={analysisColumns}
          heading={strings.heading_analysis}
          buttonLabel={config.VITE_ENABLE_GOSUAI ? strings.gosu_analysis : null}
          buttonTo={`${gosuUrl}Analysis`}
          buttonIcon={gosuIcon}
          radiantTeam={match.radiant_team}
          direTeam={match.dire_team}
          radiantWin={match.radiant_win}
        />
      </div>),
  }, {
    name: strings.tab_cosmetics,
    key: 'cosmetics',
    parsed: true,
    content: match => (
      <div>
        <Heading
          title={strings.heading_cosmetics}
          buttonLabel={config.VITE_ENABLE_GOSUAI ? strings.gosu_default : null}
          buttonTo={`${gosuUrl}Cosmetics`}
          buttonIcon={gosuIcon}
        />
        <Table data={match.players.filter(obj => obj.cosmetics.length > 0)} columns={cosmeticsColumns} />
      </div>
    ),
  }, {
    name: strings.tab_log,
    key: 'log',
    skeleton: true,
    parsed: true,
    content: match => (
      <div>
        <MatchLog match={match} />
      </div>),
  }, {
    name: strings.tab_fantasy,
    key: 'fantasy',
    parsed: true,
    content: match => (
      <div>
        <TeamTable
          players={match.players}
          columns={fantasyColumns}
          heading={strings.heading_fantasy}
          buttonLabel={config.VITE_ENABLE_GOSUAI ? strings.gosu_default : null}
          buttonTo={`${gosuUrl}Fantasy`}
          buttonIcon={gosuIcon}
          radiantTeam={match.radiant_team}
          direTeam={match.dire_team}
          radiantWin={match.radiant_win}
          hoverRowColumn
        />
      </div>),
  }, {
    name: strings.tab_chat,
    key: 'chat',
    parsed: true,
    content: (match) => {
      const data = (match.chat || []).map((msg) => {
        const p = match.players[msg.slot];
        if (p) {
          return {
            ...msg,
            accountID: p.account_id,
            heroID: p.hero_id,
            name: p.name || p.personaname || strings.general_anonymous,
          };
        }

        return msg;
      });

      return (
        <div>
          <Chat data={data} />
        </div>
      );
    },
  }, {
    name: strings.tab_story,
    key: 'story',
    parsed: true,
    content: match => (
      <div>
        <MatchStory match={match} />
      </div>),
  }];
};

export default (matchId, match, strings) => matchPages(strings).map(page => ({
  // ...page,
  name: page.name,
  key: page.key,
  parsed: page.parsed,
  content: page.content,
  route: `/matches/${matchId}/${page.key.toLowerCase()}`,
  disabled: match && !match.version && page.parsed,
  hidden: m => page.hidden && page.hidden(m),
  skeleton: page.skeleton,
}));
