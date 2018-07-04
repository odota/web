import React from 'react';
import { shape, number, string } from 'prop-types';
import styled from 'styled-components';
import AttributeMain from './AttributeMain';
import constants from '../constants';

const AttributesWrapper = styled.div`
  background: rgba(0, 0, 0, .45);
  border-radius: 8px;
  display: block;
  margin: auto;
  max-width: 300px;
  padding: 12px;
`;

const MainAttributesBlock = styled.div`
  display: flex;

  @media screen and (max-width: ${constants.wrapTablet}) {
    display: block;
  }
`;

const HeroAttributes = ({ hero }) => (
  <AttributesWrapper>
    <MainAttributesBlock>
      <AttributeMain attribute="str" isPrimary={(hero.primary_attr === 'str')} base={hero.base_str} gain={hero.str_gain} />
      <AttributeMain attribute="agi" isPrimary={(hero.primary_attr === 'agi')} base={hero.base_agi} gain={hero.agi_gain} />
      <AttributeMain attribute="int" isPrimary={(hero.primary_attr === 'int')} base={hero.base_int} gain={hero.int_gain} />
    </MainAttributesBlock>
  </AttributesWrapper>
);

HeroAttributes.propTypes = {
  hero: shape({
    primary_attr: string,
    base_str: number,
    base_agi: number,
    base_int: number,
    str_gain: number,
    agi_gain: number,
    int_gain: number,
  }),
};

export default HeroAttributes;
