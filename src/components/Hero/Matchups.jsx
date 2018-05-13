import React from 'react';
import { shape, string, bool, number, func, arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ContentLoader from 'react-content-loader';
import { getHeroMatchups } from '../../actions';
import Table, { TableLink } from '../Table';
import strings from '../../lang';
import { wilsonScore } from '../../utility';

const { REACT_APP_API_HOST } = process.env;

const HeroImage = styled.img`
  width: 50px;
  margin-right: 10px;
`;

const HeroWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const getMatchupsColumns = (heroes) => {
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
            <HeroImage key={field} alt={hero.localized_name} src={REACT_APP_API_HOST + hero.img} />
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

const MatchupSkeleton = props => (
  <ContentLoader
    primaryColor="#371b68"
    secondaryColor="#371b68"
    width={400}
    animate={false}
    {...props}
  >
    <rect x="0" y="10" rx="5" ry="5" width="300" height="5" />
    <rect x="0" y="25" rx="5" ry="5" width="300" height="5" />
    <rect x="0" y="40" rx="5" ry="5" width="300" height="5" />
    <rect x="0" y="55" rx="5" ry="5" width="300" height="5" />
    <rect x="0" y="70" rx="5" ry="5" width="300" height="5" />
  </ContentLoader>
);

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
  };

  componentDidMount() {
    const { onGetHeroMatchups, match } = this.props;

    if (match.params && match.params.heroId) {
      onGetHeroMatchups(match.params.heroId);
    }
  }

  renderTable() {
    const { heroes, data } = this.props;

    const preparedData = data.map(item => ({
      ...item,
      win_rate: Math.max(0, Math.min(100, (item.wins / item.games_played * 100).toFixed(2))),
      advantage: Math.round(wilsonScore(item.wins, item.games_played - item.wins) * 100),
    })).sort((a, b) => b.games_played - a.games_played);

    return <Table data={preparedData} columns={getMatchupsColumns(heroes)} />;
  }

  render() {
    const { isLoading } = this.props;

    if (isLoading) {
      return <MatchupSkeleton />;
    }

    return this.renderTable();
  }
}

const mapStateToProps = ({ app }) => ({
  isLoading: app.heroMatchups.loading,
  data: app.heroMatchups.data,
  heroes: app.heroStats.data,
});

const mapDispatchToProps = {
  onGetHeroMatchups: getHeroMatchups,
};

export default connect(mapStateToProps, mapDispatchToProps)(Matchups);
