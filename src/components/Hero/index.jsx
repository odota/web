/* global API_HOST */
import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import heroes from 'dotaconstants/build/heroes.json';
import strings from 'lang';
import Heading from 'components/Heading';
import StyledHeading from 'components/Heading/StyledHeading';
import TabBar from 'components/TabBar';
import styled from 'styled-components';
import Ranking from './Ranking';
import Benchmark from './Benchmark';

const getSingleHero = heroId => ({ ...heroes[heroId], img: API_HOST + heroes[heroId].img });

const StyledImage = styled.img`
  border: solid 1px rgba(255, 255, 255, 0.3);
  margin: 0 auto;
  height: 100%;
`;

const tabs = heroId => ([
  {
    name: strings.tab_rankings,
    key: 'rankings',
    content: props => (<div>
      <Heading title={strings.tab_rankings} subtitle={strings.rankings_description} />
      <Ranking {...props} />
    </div>),
    route: `/heroes/${heroId}/rankings`,
  },
  {
    name: strings.tab_benchmarks,
    key: 'benchmarks',
    content: props => (<div>
      <Heading title={strings.tab_benchmarks} />
      <Benchmark {...props} />
    </div>),
    route: `/heroes/${heroId}/benchmarks`,
  },
]);

const Hero = ({ props }) => {
  const route = props.match.params.info || 'rankings';
  const heroId = props.match.params.heroId;
  return (<div>
    <Helmet title={getSingleHero(props.match.params.heroId).localized_name} />
    <div style={{ textAlign: 'center' }}>
      <StyledHeading
        title={getSingleHero(props.match.params.heroId).localized_name}
        icon=""
      />
      <StyledImage alt="" src={getSingleHero(props.match.params.heroId).img} />
    </div>
    <div>
      <TabBar
        info={route}
        tabs={tabs(heroId)}
      />
      {tabs(heroId).filter(tab => tab.key === route).map(tab => tab.content(props))}
    </div>
  </div>);
};

export default connect()(Hero);
