import React from 'react';
import strings from 'lang';
import {
  transformations,
} from 'utility';
import Table from 'components/Table';
import Container from 'components/Container';
// import { List } from 'material-ui/List';
// import SearchResultItem from './SearchResultItem';
// import style from './search.css';

const searchColumns = [{
  displayName: strings.th_name,
  field: 'personaname',
  displayFn: (row, col, field) => {
    const subtitle = row.account_id;
    return transformations.player({ ...row,
      subtitle,
    }, col, field);
  },
}];

const proColumns = [{
  displayName: strings.th_name,
  field: 'name',
  displayFn: (row, col, field) => {
    const subtitle = row.account_id;
    return transformations.player({
      ...row,
      subtitle,
    }, col, field);
  },
}, {
  displayName: strings.th_team_name,
  field: 'team_name',
}];

export default ({
  players,
  playersLoading,
  playersError,
  pros,
  prosLoading,
  prosError,
}) => (
  <div>
    <Container
      loading={prosLoading}
      error={prosError}
      title={strings.app_pro_players}
      hide={!pros || pros.length === 0}
    >
      <Table
        paginated
        pageLength={5}
        data={pros}
        columns={proColumns}
      />
    </Container>
    <Container
      loading={playersLoading}
      error={playersError}
      title={`${players.length} ${strings.app_results}`}
    >
      <Table
        paginated
        data={players}
        columns={searchColumns}
      />
    </Container>
  </div>
);
