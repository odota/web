import React from 'react';
import { shape, number } from 'prop-types';
import styled from 'styled-components';
import strings from 'lang';
import Attribute, { TYPES as ATTR_TYPES } from './Attribute';

const AttributesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
`;

const AttributeBlock = styled.div`
  &:last-child {
    margin-right: initial;
  }

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 10px;
`;

const calcArmorPercent = hero => Math.round(0.06 * hero / (1 + (0.06 * hero)) * 100);

const HeroAttributes = ({ hero }) => (
  <AttributesWrapper>
    <AttributeBlock>
      <Attribute
        type={ATTR_TYPES.str}
        value={`${hero.base_str} + ${hero.str_gain}`}
        primary={hero.primary_attr === 'str'}
      />
      <Attribute
        type={ATTR_TYPES.agi}
        value={`${hero.base_agi} + ${hero.agi_gain}`}
        primary={hero.primary_attr === 'agi'}
      />
      <Attribute
        type={ATTR_TYPES.int}
        value={`${hero.base_int} + ${hero.int_gain}`}
        primary={hero.primary_attr === 'int'}
      />
    </AttributeBlock>
    <AttributeBlock>
      <Attribute type="Attack:" value={`${hero.base_attack_min} - ${hero.base_attack_max}`} />
      <Attribute type="Attack speed:" value={hero.attack_rate} />
      <Attribute type="Attack range:" value={hero.attack_range} />
      {hero.projectile_speed !== 0 && (
        <Attribute type="Projectile speed:" value={hero.projectile_speed} />
      )}
    </AttributeBlock>
    <AttributeBlock>
      <Attribute type="Health:" value={hero.base_health} />
      <Attribute type="Health regen:" value={hero.base_health_regen} />
      <Attribute type="Mana:" value={hero.base_mana} />
      <Attribute type="Mana regen:" value={hero.base_mana_regen} />
    </AttributeBlock>
    <AttributeBlock>
      <Attribute
        type="Armor:"
        value={`${hero.base_armor} (${calcArmorPercent(hero.base_armor)}%)`}
      />
      <Attribute type="Magic resistance:" value={`${hero.base_mr}%`} />
      <Attribute type="Move Speed:" value={hero.move_speed} />
      <Attribute type="Turn speed:" value={hero.turn_rate} />
    </AttributeBlock>
    <AttributeBlock>
      <Attribute type="Number of legs:" value={`${hero.legs}`} />
      <Attribute type="CM Enabled:" value={hero.cm_enabled ? strings.yes : strings.no} />
    </AttributeBlock>
  </AttributesWrapper>
);

HeroAttributes.propTypes = {
  hero: shape({}),
};

export default HeroAttributes;
