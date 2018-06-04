import React from 'react';
import { bool, func, arrayOf, shape, number, string } from 'prop-types';
import { connect } from 'react-redux';
import { getHeroPlayers } from '../../actions';
import Table, { TableLink } from '../Table';
import PlayersSkeleton from '../Skeletons/PlayersSkeleton';
import { wilsonScore } from '../../utility';
import { proPlayersSelector } from '../../reducers/selectors';

class Players extends React.Component {
  static propTypes = {
    isLoading: bool,
    data: arrayOf(shape({
      account_id: number,
      games_played: number,
      wins: number,
    })),
    match: shape({
      params: shape({
        heroId: string,
      }),
    }),
    onGetHeroPlayers: func,
    proPlayers: shape({}),
    strings: shape({}),
  };

  componentDidMount() {
    const { onGetHeroPlayers, match } = this.props;

    if (match.params && match.params.heroId) {
      onGetHeroPlayers(match.params.heroId);
    }
  }

  render() {
    const {
      data, isLoading, proPlayers, strings,
    } = this.props;

    const playersColumns = [
      {
        field: 'account_id',
        displayName: strings.th_account_id,
        displayFn: (row, col, field) => <TableLink to={`/players/${field}`}>{row.name || field}</TableLink>,
      },
      {
        field: 'games_played',
        displayName: strings.th_games_played,
        relativeBars: true,
        sortFn: true,
      },
      {
        field: 'wins',
        displayName: strings.th_win,
        relativeBars: true,
        sortFn: true,
        displayFn: (row, col, field) => `${field}`,
      },
      {
        tooltip: strings.tooltip_advantage,
        field: 'advantage',
        displayName: strings.th_advantage,
        relativeBars: true,
        sortFn: true,
        displayFn: (row, col, field) => `${field}`,
      },
    ];

    if (isLoading) {
      return <PlayersSkeleton />;
    }

    const preparedData = data
      .map((item) => {
        const wins = Math.max(0, Math.min(100, (item.wins / item.games_played * 100).toFixed(2)));
        const advantage = Math.round(wilsonScore(item.wins, item.games_played - item.wins) * 100);
        const proPlayer = proPlayers[item.account_id];
        const name = proPlayer ? proPlayer.name : undefined;

        return {
          ...item,
          wins,
          advantage,
          name,
        };
      })
      .sort((a, b) => b.games_played - a.games_played);

    return <Table data={preparedData} columns={playersColumns} paginated />;
  }
}

const mapStateToProps = state => ({
  isLoading: state.app.heroPlayers.loading,
  data: Object.values(state.app.heroPlayers.data),
  proPlayers: proPlayersSelector(state),
  strings: state.app.strings,
});

const mapDispatchToProps = {
  onGetHeroPlayers: getHeroPlayers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Players);
