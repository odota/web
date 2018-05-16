import React from 'react';
import { arrayOf, shape, bool, func, string, oneOfType } from 'prop-types';
import { connect } from 'react-redux';
import Table, { TableLink } from '../Table';
import RecentSkeleton from '../Skeletons/RecentSkeleton';
import ErrorBox from '../Error/ErrorBox';
import { getHeroRecentGames } from '../../actions';
import { transformations } from '../../utility';
import { proPlayersSelector } from '../../reducers/selectors';

class Recent extends React.Component {
  static propTypes = {
    isLoading: bool,
    isError: bool,
    result: oneOfType([arrayOf(shape({})), shape({})]),
    onGetRecentMatches: func,
    match: shape({
      params: shape({
        heroId: string,
      }),
    }),
    proPlayers: shape({
      name: string,
    }),
    strings: shape({}),
  }

  componentDidMount() {
    const { onGetRecentMatches, match } = this.props;

    if (match.params && match.params.heroId) {
      onGetRecentMatches(match.params.heroId);
    }
  }

  render() {
    const {
      isLoading, isError, result, proPlayers, strings,
    } = this.props;

    const matchesColumns = [
      {
        displayName: strings.th_account_id,
        field: 'account_id',
        displayFn: (row, col, field) => (
          <div>
            <TableLink to={`/players/${field}`}>{row.name ? row.name : field}</TableLink>
          </div>
        ),
      },
      {
        displayName: strings.th_duration,
        tooltip: strings.tooltip_duration,
        field: 'duration',
        sortFn: true,
        displayFn: transformations.duration,
      },
      {
        displayName: strings.th_result,
        tooltip: strings.tooltip_result,
        field: 'radiant_win',
        displayFn: transformations.radiant_win_and_game_mode,
      },
      {
        displayName: strings.th_kills,
        tooltip: strings.tooltip_kills,
        field: 'kills',
        sortFn: true,
        displayFn: transformations.kda,
      },
      {
        displayName: strings.th_deaths,
        tooltip: strings.tooltip_deaths,
        field: 'deaths',
        sortFn: true,
      },
      {
        displayName: strings.th_assists,
        tooltip: strings.tooltip_assists,
        field: 'assists',
        sortFn: true,
      },
    ];

    if (isError || (result && result.error)) {
      return <ErrorBox />;
    }

    // Merge recent matches with ProPlayer names
    const mergedResult = result.map((match) => {
      const proPlayer = proPlayers[match.account_id];

      return {
        name: proPlayer ? proPlayer.name : undefined,
        ...match,
      };
    });

    return (
      <div>
        {isLoading || isError || result === null ? (
          <RecentSkeleton />
        ) : (
          <Table data={mergedResult} columns={matchesColumns} paginated />
        )}
      </div>
    );
  }
}

Recent.defaultProps = {
  result: null,
  isError: false,
  isLoading: false,
};

const mapStateToProps = state => ({
  isLoading: state.app.heroRecentGames.loading,
  isError: state.app.heroRecentGames.error || !!state.app.heroRecentGames.data.error,
  result: state.app.heroRecentGames.data,
  proPlayers: proPlayersSelector(state),
  strings: state.app.strings,
});

const mapDispatchToProps = {
  onGetRecentMatches: getHeroRecentGames,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recent);
