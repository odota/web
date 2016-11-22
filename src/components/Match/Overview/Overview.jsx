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
};
