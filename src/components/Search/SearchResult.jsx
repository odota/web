import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  transformations,
  fromNow,
} from '../../utility';
import Table, { TableLink } from '../Table';
import Container from '../Container';
// import { List } from 'material-ui/List';

const searchColumns = strings => [{
  displayName: strings.th_name,
  field: 'personaname',
  displayFn: (row, col, field) => {
    const subtitle = row.last_match_time ? fromNow(new Date(row.last_match_time) / 1000) : '';
    return transformations.player({
      ...row,
      subtitle,
    }, col, field);
  },
}];

const proColumns = strings => [{
  displayName: strings.th_name,
  field: 'name',
  displayFn: (row, col, field) => transformations.player({
    ...row,
  }, col, field),
}, {
  displayName: strings.th_team_name,
  field: 'team_name',
  displayFn: (row, col, field) => (
    <TableLink to={`/teams/${row.team_id}`}>{field || strings.general_unknown}</TableLink>
  ),
}];

const Search = ({
  players,
  playersLoading,
  playersError,
  pros,
  prosLoading,
  prosError,
  strings,
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
        columns={proColumns(strings)}
      />
    </Container>
    <Container
      loading={playersLoading}
      error={playersError}
      title={strings.app_public_players}
      subtitle={`${players.length} ${strings.app_results}`}
    >
      <Table
        paginated
        data={players}
        columns={searchColumns(strings)}
      />
    </Container>
  </div>
);

Search.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({})),
  playersLoading: PropTypes.bool,
  playersError: PropTypes.string,
  pros: PropTypes.arrayOf(PropTypes.shape({})),
  prosLoading: PropTypes.bool,
  prosError: PropTypes.string,
  strings: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Search);
