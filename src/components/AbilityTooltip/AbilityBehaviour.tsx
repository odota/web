import styled from 'styled-components';
import constants from '../constants';
import { formatValues } from '../../utility';
import React from 'react';

const Behavior = styled.div`
  position: relative;
  padding: 13px;
  color: #95a5a6;

  span {
    &:nth-child(2) {
      color: ${constants.primaryTextColor};
      font-weight: 500;
    }
    &[type='Yes'] {
      color: ${constants.colorGreen};
    }
    &[type='Strong Dispels Only'] {
      color: darkred;
    }
    &[type='No'] {
      color: ${constants.colorRed};
    }
    &[type='Pure'] {
      color: ${constants.colorDamageTypePure};
    }
    &[type='Physical'] {
      color: ${constants.colorDamageTypePhysical};
    }
    &[type='Magical'] {
      color: ${constants.colorDamageTypeMagical};
    }
  }
`;

const AbilityBehaviour = ({ ability }: { ability: { behavior?: any, dmg_type?: string, bkbpierce?: boolean, dispellable?: boolean } }) => (
  <Behavior>
    {ability.behavior ? (
      <div>
        <span>TARGET: </span>
        <span>{formatValues(ability.behavior)}</span>
      </div>
    ) : (
      ''
    )}
    {ability.dmg_type ? (
      <div>
        <span>DAMAGE TYPE: </span>
        {/* @ts-expect-error */}
        <span type={ability.dmg_type}>{`${ability.dmg_type}`}</span>
      </div>
    ) : (
      ''
    )}
    {ability.bkbpierce ? (
      <div>
        <span>PIERCES DEBUFF IMMUNITY: </span>
        {/* @ts-expect-error */}
        <span type={ability.bkbpierce}>{`${ability.bkbpierce}`}</span>
      </div>
    ) : (
      ''
    )}
    {ability.dispellable ? (
      <div>
        <span>DISPELLABLE: </span>
        {/* @ts-expect-error */}
        <span type={ability.dispellable}>{`${ability.dispellable}`}</span>
      </div>
    ) : (
      ''
    )}
  </Behavior>
);

export default AbilityBehaviour;