import React from 'react';
import { shape, number, string, bool } from 'prop-types';
import styled from 'styled-components';
import strings from '../../lang';
import AttrStrength from '../Icons/AttrStrength';
import AttrAgility from '../Icons/AttrAgility';
import AttrIntelligent from '../Icons/AttrIntelligent';
import constants from '../constants';
import Attribute from './Attribute';
import AttributeMain from './AttributeMain';


const AttributesWrapper = styled.div`
  background: rgba(0, 0, 0, .45);
  border-radius: 8px;
  display: block;
  padding: 12px;
`;

const MainAttributesBlock = styled.div`
  display: flex;
`;

const HeroAttributes = ({ hero }) => (
  <AttributesWrapper>
    <MainAttributesBlock>
      <AttributeMain attribute="str" isPrimary={(hero.primary_attr === 'str')} icon={AttrStrength} base={hero.base_str} gain={hero.str_gain} />
      <AttributeMain attribute="agi" isPrimary={(hero.primary_attr === 'agi')} icon={AttrAgility} base={hero.base_agi} gain={hero.agi_gain} />
      <AttributeMain attribute="int" isPrimary={(hero.primary_attr === 'int')} icon={AttrIntelligent} base={hero.base_int} gain={hero.int_gain} />
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
    int_gain: number
  }),
};

export default HeroAttributes;
