import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import strings from 'lang';
import Heading from 'components/Heading';
import TabBar from 'components/TabBar';
import Spinner from 'components/Spinner';
import ErrorBox from 'components/Error/ErrorBox';
import constants from 'components/constants';
import styled from 'styled-components';
import { heroSelector } from 'reducers/selectors';
import Ranking from './Ranking';
import Benchmark from './Benchmark';
import Recent from './Recent';
import Matchups from './Matchups';
import AttributesBlock from './AttributesBlock';
import Durations from './Durations';
import Players from './Players';

const getHeroImgSrc = src => process.env.REACT_APP_API_HOST + src;

const StyledImage = styled.img`
  border: solid 1px rgba(255, 255, 255, 0.3);
  height: 100%;
  margin-right: 25px;
`;

const HeroWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const HeroName = styled.div`
  font-size: 20px;
  margin-bottom: 5px;
`;

const HeroRole = styled.div`
  font-size: 16px;
  color: ${constants.colorMutedLight};
`;

const HeroDescription = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Disclaimer = styled.p`
  color: ${constants.colorMutedLight};
`;

const HeroAttackTipe = styled.span`color: ${constants.textColorPrimary};`;

const tabs = heroId => [
  {
    name: strings.tab_rankings,
    key: 'rankings',
    content: props => (
      <div>
        <Heading title={strings.tab_rankings} subtitle={strings.rankings_description} />
        <Ranking {...props} />
      </div>
    ),
    route: `/heroes/${heroId}/rankings`,
  },
  {
    name: strings.tab_benchmarks,
    key: 'benchmarks',
    content: props => (
      <div>
        <Heading title={strings.tab_benchmarks} />
        <Disclaimer>{strings.hero_disclaimer_public}</Disclaimer>
        <Benchmark {...props} />
      </div>
    ),
    route: `/heroes/${heroId}/benchmarks`,
  },
  {
    name: strings.tab_recent,
    key: 'recent',
    content: props => (
      <div>
        <Heading title={strings.tab_recent} />
        <Disclaimer>{strings.hero_disclaimer_pro}</Disclaimer>
        <Recent {...props} />
      </div>
    ),
    route: `/heroes/${heroId}/recent`,
  },
  {
    name: strings.tab_matchups,
    key: 'matchups',
    content: props => (
      <div>
        <Heading title={strings.tab_matchups} />
        <Disclaimer>{strings.hero_disclaimer_pro}</Disclaimer>
        <Matchups {...props} />
      </div>
    ),
    route: `/heroes/${heroId}/matchups`,
  },
  {
    name: strings.tab_durations,
    key: 'durations',
    content: props => (
      <div>
        <Heading title={strings.tab_durations} />
        <Disclaimer>{strings.hero_disclaimer_pro}</Disclaimer>
        <Durations {...props} />
      </div>
    ),
    route: `/heroes/${heroId}/durations`,
  },
  {
    name: strings.tab_players,
    key: 'players',
    content: props => (
      <div>
        <Heading title={strings.tab_players} />
        <Disclaimer>{strings.hero_disclaimer_public}</Disclaimer>
        <Players {...props} />
      </div>
    ),
    route: `/heroes/${heroId}/players`,
  },
];

const Hero = (props) => {
  const route = props.match.params.info || 'rankings';
  const { heroId } = props.match.params;
  const hero = heroSelector(props.heroes, heroId);

  if (props.heroes.length === 0) {
    return <Spinner />;
  }

  if (!hero) {
    const errorText = `Hero id${heroId} not found...`;
    return <ErrorBox text={errorText} />;
  }

  const currentTab = tabs(heroId).find(tab => tab.key === route);
  return (
    <div>
      <Helmet title={hero.localized_name} />
      <HeroWrapper>
        <StyledImage alt="" src={getHeroImgSrc(hero.img)} />
        <HeroDescription>
          <HeroName>
            {hero.localized_name}
            <HeroRole>
              <HeroAttackTipe>{hero.attack_type}</HeroAttackTipe>, {hero.roles.join(', ')}
            </HeroRole>
          </HeroName>
          <AttributesBlock hero={hero} />
        </HeroDescription>
      </HeroWrapper>
      <div>
        <TabBar info={route} tabs={tabs(heroId)} />
        {currentTab ? currentTab.content(props) : null}
      </div>
    </div>
  );
};

const { shape, string, arrayOf } = PropTypes;

Hero.propTypes = {
  match: shape({
    params: shape({
      info: string,
      heroId: string,
    }),
  }),
  heroes: arrayOf(shape({})),
};

Hero.defaultProps = {
  heroes: [],
};

const mapStateToProps = state => ({
  isLoading: state.app.heroStats.loading,
  isError: state.app.heroStats.error,
  heroes: state.app.heroStats.data,
});

export default connect(mapStateToProps)(Hero);
