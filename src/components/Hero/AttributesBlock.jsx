import React from 'react';
import { shape, number, string, bool } from 'prop-types';
import styled from 'styled-components';
import strings from 'lang';
import AttrStrength from 'components/Icons/AttrStrength';
import AttrAgility from 'components/Icons/AttrAgility';
import AttrIntelligent from 'components/Icons/AttrIntelligent';
import constants from 'components/constants';
import Attribute from './Attribute';

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
  margin-right: 10px;
`;

const Label = styled.span`
  margin-right: 5px;
  color: ${constants.colorMutedLight};
`;

const renderIcon = Icon => <Icon style={{ width: 20, marginRight: 4 }} />;

const calcArmorPercent = hero => Math.round(0.06 * hero / (1 + (0.06 * hero)) * 100);

const HeroAttributes = ({ hero }) => (
  <AttributesWrapper>
    <AttributeBlock>
      <Attribute primary={hero.primary_attr === 'str'}>
        {renderIcon(AttrStrength)} {`${hero.base_str} + ${hero.str_gain}`}
      </Attribute>
      <Attribute primary={hero.primary_attr === 'agi'}>
        {renderIcon(AttrAgility)} {`${hero.base_agi} + ${hero.agi_gain}`}
      </Attribute>
      <Attribute primary={hero.primary_attr === 'int'}>
        {renderIcon(AttrIntelligent)} {`${hero.base_int} + ${hero.int_gain}`}
      </Attribute>
    </AttributeBlock>
    <AttributeBlock>
      <Attribute>
        <Label>Attack:</Label> {`${hero.base_attack_min} - ${hero.base_attack_max}`}
      </Attribute>
      <Attribute>
        <Label>Attack range:</Label> {hero.attack_range}
      </Attribute>
      <Attribute>
        <Label>Attack speed:</Label> {hero.attack_rate}
      </Attribute>
      {hero.projectile_speed !== 0 && (
        <Attribute>
          <Label>Projectile speed:</Label> {hero.projectile_speed}
        </Attribute>
      )}
    </AttributeBlock>
    <AttributeBlock>
      <Attribute>
        <Label>Health:</Label> {hero.base_health}
      </Attribute>
      <Attribute>
        <Label>Health regen:</Label> {hero.base_health_regen}
      </Attribute>
      <Attribute>
        <Label>Mana:</Label> {hero.base_mana}
      </Attribute>
      <Attribute>
        <Label>Mana regen:</Label> {hero.base_mana_regen}
      </Attribute>
    </AttributeBlock>
    <AttributeBlock>
      <Attribute>
        <Label>Armor:</Label> {`${hero.base_armor} (${calcArmorPercent(hero.base_armor)}%)`}
      </Attribute>
      <Attribute>
        <Label>Magic resistance:</Label> {`${hero.base_mr}%`}
      </Attribute>
      <Attribute>
        <Label>Move Speed:</Label> {hero.move_speed}
      </Attribute>
      <Attribute>
        <Label>Turn speed:</Label> {hero.turn_rate}
      </Attribute>
    </AttributeBlock>
    <AttributeBlock>
      <Attribute>
        <Label>Number of legs:</Label> {hero.legs}
      </Attribute>
      <Attribute>
        <Label>CM Enabled:</Label> {hero.cm_enabled ? strings.yes : strings.no}
      </Attribute>
    </AttributeBlock>
  </AttributesWrapper>
);

HeroAttributes.propTypes = {
  hero: shape({
    primary_attr: string,
    base_health: number,
    base_health_regen: number,
    base_mana: number,
    base_mana_regen: number,
    base_armor: number,
    base_mr: number,
    base_attack_min: number,
    base_attack_max: number,
    base_str: number,
    base_agi: number,
    base_int: number,
    str_gain: number,
    agi_gain: number,
    int_gain: number,
    attack_range: number,
    projectile_speed: number,
    attack_rate: number,
    move_speed: number,
    turn_rate: number,
    cm_enabled: bool,
    legs: number,
  }),
};

export default HeroAttributes;
