import React from 'react';
import { bool, func, arrayOf, shape, number, string } from 'prop-types';
import { connect } from 'react-redux';
import { getHeroPlayers } from 'actions';
import Spinner from 'components/Spinner';
import Table, { TableLink } from 'components/Table';
import strings from 'lang';
import { wilsonScore } from 'utility';

const playersColumns = [
  {
    field: 'account_id',
    displayName: strings.th_account_id,
    displayFn: (row, col, field) => <TableLink to={`/players/${field}`}>{field}</TableLink>,
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
    displayFn: (row, col, field) => `${field}%`,
  },
  {
    field: 'advantage',
    displayName: strings.th_advantage,
    relativeBars: true,
    sortFn: true,
    displayFn: (row, col, field) => `${field}%`,
  },
];

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
  };

  componentDidMount() {
    const { onGetHeroPlayers, match } = this.props;

    if (match.params && match.params.heroId) {
      onGetHeroPlayers(match.params.heroId);
    }
  }

  render() {
    const { data, isLoading } = this.props;

    if (isLoading) {
      return <Spinner />;
    }

    const preparedData = data
      .map(item => ({
        ...item,
        wins: Math.round(item.wins / item.games_played * 100),
        advantage: Math.round(wilsonScore(item.wins, item.games_played - item.wins) * 100),
      }))
      .sort((a, b) => b.advantage - a.advantage);

    return <Table data={preparedData} columns={playersColumns} paginated />;
  }
}

const mapStateToProps = ({ app }) => ({
  isLoading: app.heroPlayers.loading,
  data: Object.values(app.heroPlayers.data),
});

const mapDispatchToProps = {
  onGetHeroPlayers: getHeroPlayers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Players);
