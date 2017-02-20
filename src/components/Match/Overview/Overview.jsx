import React from 'react';
import strings from 'lang';

import TeamTable from '../TeamTable';
import { overviewColumns } from '../matchColumns';
import BuildingMap from '../BuildingMap';
import MatchGraph from '../MatchGraph';
import styles from './Overview.css';
import Timeline from './Timeline';

export default {
  name: strings.tab_overview,
  key: 'overview',
  content: match => (
    <div>
      <Timeline match={match} />
      <TeamTable
        players={match.players}
        columns={overviewColumns(match)}
        heading={strings.heading_overview}
        picksBans={match.picks_bans}
        radiantTeam={match.radiant_team}
        direTeam={match.dire_team}
        summable
      />
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
};
