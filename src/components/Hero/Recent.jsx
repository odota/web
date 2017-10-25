import React from 'react';
import { arrayOf, shape, bool, func, string, oneOfType } from 'prop-types';
import { connect } from 'react-redux';
import Table, { TableLink } from 'components/Table';
import ErrorBox from 'components/Error/ErrorBox';
import Spinner from 'components/Spinner';
import { getHeroRecentGames } from 'actions';
import strings from 'lang';
import { transformations } from 'utility';
import { proPlayersSelector } from 'reducers/selectors';

const matchesColumns = [
  {
    displayName: strings.th_match_id,
    field: 'match_id',
    sortFn: true,
    displayFn: (row, col, field) => (
      <div>
        <TableLink to={`/matches/${field}`}>{field}</TableLink>
        <span style={{ display: 'block', marginTop: 1 }}>
          {row.league_name}
        </span>
      </div>
    ),
  }, {
    displayName: strings.th_account_id,
    field: 'account_id',
    displayFn: (row, col, field) => (
      <div>
        <TableLink to={`/players/${field}`}>{row.name ? row.name : field}</TableLink>
      </div>
    ),
  }, {
    displayName: strings.th_duration,
    tooltip: strings.tooltip_duration,
    field: 'duration',
    sortFn: true,
    displayFn: transformations.duration,
  }, {
    displayName: strings.th_result,
    tooltip: strings.tooltip_result,
    field: 'radiant_win',
    displayFn: transformations.radiant_win,
  }, {
    displayName: strings.th_kills,
    tooltip: strings.tooltip_kills,
    field: 'kills',
    sortFn: true,
    displayFn: transformations.kda,
  }, {
    displayName: strings.th_deaths,
    tooltip: strings.tooltip_deaths,
    field: 'deaths',
    sortFn: true,
  }, {
    displayName: strings.th_assists,
    tooltip: strings.tooltip_assists,
    field: 'assists',
    sortFn: true,
  },
];

class Recent extends React.Component {
  componentDidMount() {
    const { onGetRecentMatches, match } = this.props;

    if (match.params && match.params.heroId) {
      onGetRecentMatches(match.params.heroId);
    }
  }

  render() {
    const { isLoading, isError, result, proPlayers } = this.props;

    if (isError || (result && result.error)) {
      return <ErrorBox />;
    }

    // Merge recent matches with ProPlayer names
    const mergedResult = result.map(match => {
      const proPlayer = proPlayers[match.account_id];

      return {
        name: proPlayer ? proPlayer.name : undefined,
        ...match,
      };
    });

    return (
      <div>
        {isLoading || isError || result === null ? (
          <Spinner />
        ) : (
          <Table data={mergedResult} columns={matchesColumns} paginated />
        )}
      </div>
    );
  }
}

Recent.propTypes = {
  isLoading: bool,
  isError: bool,
  result: oneOfType([
    arrayOf(shape({})),
    shape({}),
  ]),
  onGetRecentMatches: func,
  match: shape({
    params: shape({
      heroId: string,
    }),
  }),
  proPlayers: shape({
    name: string,
  }),
};

Recent.defaultProps = {
  result: null,
  isError: false,
  isLoading: false,
};

const mapStateToProps = state => ({
  isLoading: state.app.heroRecentGames.loading,
  isError:
    state.app.heroRecentGames.error ||
    !!state.app.heroRecentGames.data.error,
  result: state.app.heroRecentGames.data,
  proPlayers: proPlayersSelector(state),
});

const mapDispatchToProps = {
  onGetRecentMatches: getHeroRecentGames,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recent);
