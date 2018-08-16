import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

import constants from '../constants';

const Wrapper = styled.div`
  max-width: 300px;
`;

const Header = styled.div`
  font-size: ${constants.fontSizeCommon};
  text-transform: uppercase;
  color: ${constants.colorBlue};
`;

const HeaderContent = styled.div`
  font-size: ${constants.fontSizeSmall};
  text-transform: none;
  display: block;
  color: ${constants.colorMutedLight};
  margin-bottom: 5px;
`;

const Trim = styled.hr`
  border: 0;
  height: 1px;
  background: linear-gradient(to right, ${constants.colorMutedLight}, rgba(0, 0, 0, 0));
  margin: 12px 0;
`;

const Attribute = styled.div`
  padding: 2px 0;
`;

const Resources = styled.div`
  margin-top: 6px;
`;

const Resource = styled.span`
  margin-right: 16px;

  &:last-child {
    margin-right: 0;
  }
`;

const ResourceIcon = styled.img`
  width: 16px;
  height: 16px;
  vertical-align: sub;
  margin-right: 5px;
`;

const ThingTooltip = ({ thing }) => (
  <Wrapper>
    <Header>
      {thing.dname}
      {thing.lore &&
      <HeaderContent>{thing.lore}</HeaderContent>}
      {thing.desc &&
      <HeaderContent>{thing.desc}</HeaderContent>}
    </Header>
    <Trim />
    {(thing.attrib || []).map(attrib => <Attribute key={attrib.key}>{`${attrib.header} ${attrib.value} ${attrib.footer || ''}`}</Attribute>)}
    {(thing.cd || thing.mc || thing.cmb || thing.cost) &&
    <Resources>
      {thing.mc > 0 &&
      <Resource>
        <ResourceIcon src={`${process.env.REACT_APP_API_HOST}/apps/dota2/images/tooltips/mana.png`} alt="" />
        {thing.mc}
      </Resource>}
      {thing.cd > 0 &&
      <Resource>
        <ResourceIcon src={`${process.env.REACT_APP_API_HOST}/apps/dota2/images/tooltips/cooldown.png`} alt="" />
        {thing.cd}
      </Resource>}
      {thing.cost &&
      <Resource>
        <ResourceIcon src={`${process.env.REACT_APP_API_HOST}/apps/dota2/images/tooltips/gold.png`} alt="" />
        {thing.cost}
      </Resource>}
    </Resources>}
  </Wrapper>
);

ThingTooltip.propTypes = {
  thing: propTypes.shape({}).isRequired,
};

export default ThingTooltip;
