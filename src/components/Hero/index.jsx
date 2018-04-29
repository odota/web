import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
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
import AttributesMain from './AttributesMain';
import AttributesBlock from './AttributesBlock';
import Durations from './Durations';
import Players from './Players';

const getHeroImgSrc = src => process.env.REACT_APP_API_HOST + src;

const WRAP_WIDTH = '1000px';

const HeroAvatar = styled.img`
  border-radius: 16px;
  border: solid 1px rgba(0, 0, 0, 0.3);
  box-shadow: 0 12px 32px rgba(0, 0, 0, .3);
  display: block;
  flex-shrink: 0;
  height: 128px;
  object-fit: cover;
  width: 180px;

  @media screen and (max-width: ${WRAP_WIDTH}) {
    height: 64px;
    width: 120px;
  }
`;

const HeroBlock = styled.div`
  margin-bottom: 8px;
`;

const HeroProfile = styled.div`
  background: ${constants.almostBlack};
  overflow: hidden;
  position: relative;
  border-radius: 8px;
`

const HeroProfileBackground = styled.img`
  background-repeat: no-repeat;
  filter: blur(25px);
  height: 125%;
  left: -12.5%;
  object-fit: cover;
  opacity: .35;
  position: absolute;
  top: -12.5%;
  width: 125%;
  z-index: 1;
`

const HeroProfileContent = styled.div`
  align-items: center;
  box-shadow: inset 0 0 125px rgba(0, 0, 0, .25);
  display: flex;
  padding: 56px;
  position: relative;
  z-index: 2;

  @media screen and (max-width: ${WRAP_WIDTH}) {
    padding: 16px;
  }
`

const HeroDetails = styled.div`
  flex-grow: 1;
  margin: 0 24px;
`

const HeroName = styled.div`
  font-size: 24px;
  font-weight: ${constants.fontWeightMedium};
  line-height: 24px;
`;

const HeroRoleInformations = styled.div`
  color: ${constants.primaryTextColor};
  font-size: 12px;
  margin: 8px 0;
  text-transform: uppercase;
`;

const HeroRoles = styled.span`
  color: ${constants.colorMutedLight};
  font-size: 12px;
  margin: 8px 0;
  text-transform: uppercase;
  word-wrap: break-word;
`;

const HeroDescription = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const HeroDetailsButton = styled(FlatButton)`
  margin: 8px auto !important;
  padding: 0 12px !important;
  width: 100%;
`

const TabsBlock = styled.div`
  width: 100%;
`;

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

class Hero extends React.Component {
  state = {
    detailsOpen: false
  }

  render () {
    const route = this.props.match.params.info || 'rankings';
    const { heroId } = this.props.match.params;
    const hero = heroSelector(this.props.heroes, heroId);

    if (this.props.heroes.length === 0) {
      return <Spinner />;
    }

    if (!hero) {
      const errorText = `Hero ${heroId} not found...`;
      return <ErrorBox text={errorText} />;
    }

    const currentTab = tabs(heroId).find(tab => tab.key === route);
    return (
      <div>
        <Helmet title={hero.localized_name} />
        <HeroBlock>
          <HeroDescription>
            <HeroProfile>
              <HeroProfileBackground alt={hero.localized_name} src={getHeroImgSrc(hero.img)} />
              <HeroProfileContent>
                <HeroAvatar alt={hero.localized_name} src={getHeroImgSrc(hero.img)} />
                <HeroDetails>
                  <HeroName>{hero.localized_name}</HeroName>
                  <HeroRoleInformations>{hero.attack_type} - <HeroRoles>{hero.roles.join(', ')}</HeroRoles></HeroRoleInformations>
                </HeroDetails>
                <div>
                  <AttributesMain hero={hero} />
                  <HeroDetailsButton type="button" onClick={this.toggleDetailVisibility.bind(this)}>
                    {this.state.detailsOpen ? 'Hide details' : 'Show more details'}
                  </HeroDetailsButton>
                </div>
              </HeroProfileContent>
            </HeroProfile>
          </HeroDescription>
          {this.state.detailsOpen && <AttributesBlock hero={hero} />}
        </HeroBlock>
        <TabsBlock>
          <TabBar info={route} tabs={tabs(heroId)} />
          {currentTab ? currentTab.content(this.props) : null}
        </TabsBlock>
      </div>
    );
  }

  toggleDetailVisibility (e) {
    e.preventDefault();

    this.setState({
      detailsOpen: !this.state.detailsOpen
    })
  }
};

const { shape, string, arrayOf, bool } = PropTypes;

Hero.propTypes = {
  match: shape({
    params: shape({
      info: string,
      heroId: string,
    }),
  }),
  heroes: arrayOf(shape({}))
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
