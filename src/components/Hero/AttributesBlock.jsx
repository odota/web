import React from 'react';
import { connect } from 'react-redux';
import { shape, number, string, bool } from 'prop-types';
import styled from 'styled-components';
import constants from '../constants';
import Attribute from './Attribute';
import { compileLevelOneStats } from '../../utility';

const AttributesWrapper = styled.div`
  display: flex;
  margin-left: -8px;
  margin-right: -8px;

  @media screen and (max-width: ${constants.wrapMobile}) {
    flex-wrap: wrap;
  }
`;

const AttributeBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  margin-top: 10px;
  padding: 8px;

  @media screen and (max-width: ${constants.wrapMobile}) {
    flex-grow: 0;
    flex-shrink: 0;
    width: 50%;
  }
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

const HeroAttributes = ({ hero, strings }) => {
  const h = compileLevelOneStats(hero);

  return (
    <AttributesWrapper>
      <AttributeBlock>
        <Attribute>
          <Label>{strings.heading_attack}:</Label> {`${h.base_attack_min} - ${h.base_attack_max}`}
        </Attribute>
        <Attribute>
          <Label>{strings.heading_attack_range}:</Label> {h.attack_range}
        </Attribute>
        <Attribute>
          <Label>{strings.heading_attack_speed}:</Label> {h.attack_rate}
        </Attribute>
        {h.projectile_speed !== 0 && (
          <Attribute>
            <Label>{strings.heading_projectile_speed}:</Label> {h.projectile_speed}
          </Attribute>
        )}
      </AttributeBlock>
      <AttributeBlock>
        <Attribute>
          <Label>{strings.heading_base_health}:</Label> {h.base_health}
        </Attribute>
        <Attribute>
          <Label>{strings.heading_base_health_regen}:</Label> {h.base_health_regen}
        </Attribute>
        <Attribute>
          <Label>{strings.heading_base_mana}:</Label> {h.base_mana}
        </Attribute>
        <Attribute>
          <Label>{strings.heading_base_mana_regen}:</Label> {h.base_mana_regen}
        </Attribute>
      </AttributeBlock>
      <AttributeBlock>
        <Attribute>
          <Label>{strings.heading_base_armor}:</Label> {`${h.base_armor} (${calcArmorPercent(h.base_armor)}%)`}
        </Attribute>
        <Attribute>
          <Label>{strings.heading_base_mr}:</Label> {`${h.base_mr}%`}
        </Attribute>
        <Attribute>
          <Label>{strings.heading_move_speed}:</Label> {h.move_speed}
        </Attribute>
        <Attribute>
          <Label>{strings.heading_turn_rate}:</Label> {h.turn_rate}
        </Attribute>
      </AttributeBlock>
      <AttributeBlock>
        <Attribute>
          <Label>{strings.heading_legs}:</Label> {h.legs}
        </Attribute>
        <Attribute>
          <Label>{strings.heading_cm_enabled}:</Label> {h.cm_enabled ? strings.yes : strings.no}
        </Attribute>
      </AttributeBlock>
    </AttributesWrapper>
  );
};

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
  strings: shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(HeroAttributes);
