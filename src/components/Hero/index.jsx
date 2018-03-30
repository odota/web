import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { heroSelector } from '../../reducers/selectors';
import strings from '../../lang';
import Heading from '../Heading';
import TabBar from '../TabBar';
import Spinner from '../Spinner';
import ErrorBox from '../Error/ErrorBox';
import constants from '../constants';
import Ranking from './Ranking';
import Benchmark from './Benchmark';
import Recent from './Recent';
import Matchups from './Matchups';
import AttributesBlock from './AttributesBlock';
import Durations from './Durations';
import Players from './Players';

const getHeroImgSrc = src => process.env.REACT_APP_API_HOST + src;

const WRAP_WIDTH = '576px';

const Wrapper = styled.div`
  display: flex;

  @media (max-width: ${WRAP_WIDTH}) {
    flex-wrap: wrap;
  }
`;

const StyledImage = styled.img`
  border: solid 1px rgba(255, 255, 255, 0.3);
`;

const HeroBlock = styled.div`
  margin-right: 25px;
  width: 258px;
`;

const HeroName = styled.div`
  font-size: 20px;
  margin-bottom: 5px;
`;

const HeroRole = styled.div`
  font-size: 16px;
  color: ${constants.colorMutedLight};
  word-wrap: break-word;
`;

const HeroDescription = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const TabsBlock = styled.div`
  width: 100%;
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
        <Heading title={strings.tab_benchmarks} subtitle={strings.hero_disclaimer_public} />
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
        <Heading title={strings.tab_recent} subtitle={strings.hero_disclaimer_pro} />
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
        <Heading title={strings.tab_matchups} subtitle={strings.hero_disclaimer_pro} />
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
        <Heading title={strings.tab_durations} subtitle={strings.hero_disclaimer_pro} />
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
        <Heading title={strings.tab_players} subtitle={strings.hero_disclaimer_pro} />
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
    const errorText = `Hero ${heroId} not found...`;
    return <ErrorBox text={errorText} />;
  }

  const currentTab = tabs(heroId).find(tab => tab.key === route);
  return (
    <Wrapper>
      <Helmet title={hero.localized_name} />
      <HeroBlock>
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
      </HeroBlock>
      <TabsBlock>
        <TabBar info={route} tabs={tabs(heroId)} />
        {currentTab ? currentTab.content(props) : null}
      </TabsBlock>
    </Wrapper>
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
