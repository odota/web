import React from 'react';
import { shape, number, string, bool } from 'prop-types';
import styled from 'styled-components';
import strings from 'lang';
import AttrStrength from 'components/Icons/AttrStrength';
import AttrAgility from 'components/Icons/AttrAgility';
import AttrIntelligent from 'components/Icons/AttrIntelligent';
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
  justify-content: space-between;
  margin-right: 10px;
`;

const renderIcon = Icon => <Icon style={{ width: 20, marginRight: 4 }} />;

const renderText = text => <span style={{ marginRight: 5 }}>{text}</span>;

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
        {renderText('Attack:')} {`${hero.base_attack_min} - ${hero.base_attack_max}`}
      </Attribute>
      <Attribute>
        {renderText('Attack speed:')} {hero.attack_rate}
      </Attribute>
      <Attribute>
        {renderText('Attack range:')} {hero.attack_range}
      </Attribute>
      {hero.projectile_speed !== 0 && (
        <Attribute>
          {renderText('Projectile speed:')} {hero.projectile_speed}
        </Attribute>
      )}
    </AttributeBlock>
    <AttributeBlock>
      <Attribute>
        {renderText('Health:')} {hero.base_health}
      </Attribute>
      <Attribute>
        {renderText('Health regen:')} {hero.base_health_regen}
      </Attribute>
      <Attribute>
        {renderText('Mana:')} {hero.base_mana}
      </Attribute>
      <Attribute>
        {renderText('Mana regen:')} {hero.base_mana_regen}
      </Attribute>
    </AttributeBlock>
    <AttributeBlock>
      <Attribute>
        {renderText('Armor:')} {`${hero.base_armor} (${calcArmorPercent(hero.base_armor)}%)`}
      </Attribute>
      <Attribute>
        {renderText('Magic resistance:')} {`${hero.base_mr}%`}
      </Attribute>
      <Attribute>
        {renderText('Move Speed:')} {hero.move_speed}
      </Attribute>
      <Attribute>
        {renderText('Turn speed:')} {hero.turn_rate}
      </Attribute>
    </AttributeBlock>
    <AttributeBlock>
      <Attribute>
        {renderText('Number of legs:')} {hero.legs}
      </Attribute>
      <Attribute>
        {renderText('CM Enabled:')} {hero.cm_enabled ? strings.yes : strings.no}
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
