import React from 'react';
import { shape, number, string, bool } from 'prop-types';
import styled from 'styled-components';
import strings from '../../lang';
import constants from '../constants';
import Attribute from './Attribute';


const AttributesWrapper = styled.div`
  display: flex;
  margin-left: -8px;
  margin-right: -8px;
`;

const AttributeBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  margin-top: 10px;
  padding: 8px;
`;

const Label = styled.span`
  color: rgba(255, 255, 255, .5);
  flex-grow: 1;
  font-size: ${constants.fontSizeSmall};
  margin-right: 5px;
  text-transform: uppercase;
`;

// Damage multiplier https://dota2.gamepedia.com/Armor#Damage_multiplier
const calcArmorPercent = hero => Math.round(0.06 * hero / (1 + (0.06 * hero)) * 100);

const HeroAttributes = ({ hero }) => (
  <AttributesWrapper>
    <AttributeBlock>
      <Attribute>
        <Label>{strings.heading_attack}:</Label> {`${hero.base_attack_min} - ${hero.base_attack_max}`}
      </Attribute>
      <Attribute>
        <Label>{strings.heading_attack_range}:</Label> {hero.attack_range}
      </Attribute>
      <Attribute>
        <Label>{strings.heading_attack_speed}:</Label> {hero.attack_rate}
      </Attribute>
      {hero.projectile_speed !== 0 && (
        <Attribute>
          <Label>{strings.heading_projectile_speed}:</Label> {hero.projectile_speed}
        </Attribute>
      )}
    </AttributeBlock>
    <AttributeBlock>
      <Attribute>
        <Label>{strings.heading_base_health}:</Label> {hero.base_health}
      </Attribute>
      <Attribute>
        <Label>{strings.heading_base_health_regen}:</Label> {hero.base_health_regen}
      </Attribute>
      <Attribute>
        <Label>{strings.heading_base_mana}:</Label> {hero.base_mana}
      </Attribute>
      <Attribute>
        <Label>{strings.heading_base_mana_regen}:</Label> {hero.base_mana_regen}
      </Attribute>
    </AttributeBlock>
    <AttributeBlock>
      <Attribute>
        <Label>{strings.heading_base_armor}:</Label> {`${hero.base_armor} (${calcArmorPercent(hero.base_armor)}%)`}
      </Attribute>
      <Attribute>
        <Label>{strings.heading_base_mr}:</Label> {`${hero.base_mr}%`}
      </Attribute>
      <Attribute>
        <Label>{strings.heading_move_speed}:</Label> {hero.move_speed}
      </Attribute>
      <Attribute>
        <Label>{strings.heading_turn_rate}:</Label> {hero.turn_rate}
      </Attribute>
    </AttributeBlock>
    <AttributeBlock>
      <Attribute>
        <Label>{strings.heading_legs}:</Label> {hero.legs}
      </Attribute>
      <Attribute>
        <Label>{strings.heading_cm_enabled}:</Label> {hero.cm_enabled ? strings.yes : strings.no}
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
