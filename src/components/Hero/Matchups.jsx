import React from 'react';
import { shape, string, bool, number, func, arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getHeroMatchups } from '../../actions';
import Table, { TableLink } from '../Table';
import MatchupsSkeleton from '../Skeletons/MatchupsSkeleton';
import { wilsonScore } from '../../utility';
import config from '../../config';

const HeroImage = styled.img`
  width: 50px;
  margin-right: 10px;
`;

const HeroWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const getMatchupsColumns = (heroes, strings) => {
  // Optimization from O(n^2) to O(n + 1);
  const heroMap = new Map();
  heroes.forEach(hero => heroMap.set(hero.id, hero));

  return [
    {
      field: 'hero_id',
      displayName: strings.th_hero_id,
      displayFn: (row, col, field) => {
        const hero = heroMap.get(field) || {};

        return (
          <HeroWrapper>
            <HeroImage key={field} alt={hero.localized_name} src={config.VITE_IMAGE_CDN + hero.img} />
            <TableLink to={`/heroes/${field}`}>{hero.localized_name}</TableLink>
          </HeroWrapper>
        );
      },
    },
    {
      field: 'games_played',
      displayName: strings.th_games_played,
      relativeBars: true,
      sortFn: true,
    },
    {
      field: 'win_rate',
      displayName: strings.th_win,
      relativeBars: true,
      sortFn: true,
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
};

class Matchups extends React.Component {
  static propTypes = {
    isLoading: bool,
    match: shape({
      params: shape({
        heroId: string,
      }),
    }),
    data: arrayOf(shape({
      hero_id: number,
      games_played: number,
      wins: number,
    })),
    heroes: arrayOf(shape({
      localized_name: string,
      img: string,
    })),
    onGetHeroMatchups: func,
    strings: shape({}),
  };

  componentDidMount() {
    const { onGetHeroMatchups, match } = this.props;

    if (match.params && match.params.heroId) {
      onGetHeroMatchups(match.params.heroId);
    }
  }

  renderTable() {
    const { heroes, data, strings } = this.props;

    const preparedData = data.map(item => ({
      ...item,
      win_rate: Math.max(0, Math.min(100, (item.wins / item.games_played * 100).toFixed(2))),
      advantage: Math.round(wilsonScore(item.wins, item.games_played - item.wins) * 100),
    })).sort((a, b) => b.games_played - a.games_played);

    return <Table data={preparedData} columns={getMatchupsColumns(heroes, strings)} />;
  }

  render() {
    const { isLoading } = this.props;

    if (isLoading) {
      return <MatchupsSkeleton />;
    }

    return this.renderTable();
  }
}

const mapStateToProps = ({ app }) => ({
  isLoading: app.heroMatchups.loading,
  data: app.heroMatchups.data,
  heroes: app.heroStats.data,
  strings: app.strings,
});

const mapDispatchToProps = {
  onGetHeroMatchups: getHeroMatchups,
};

export default connect(mapStateToProps, mapDispatchToProps)(Matchups);
