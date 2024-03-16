import styled from 'styled-components';
import constants from '../constants';
import { formatValues } from '../../utility';
import React from 'react';
import propTypes from 'prop-types';

const Behavior = styled.div`
    position: relative;
    padding: 13px;
    color: #95a5a6;

    span {  
        &:nth-child(2) {
          color: ${constants.primaryTextColor};
          font-weight: 500;
        }
        &[type="Yes"] {
            color: ${constants.colorGreen};
        }
        &[type="Strong Dispels Only"] {
            color: darkred;
        }
        &[type="No"] {
            color: ${constants.colorRed};
        }
        &[type="Pure"] {
            color: ${constants.colorDamageTypePure};
        }
        &[type="Physical"] {
            color: ${constants.colorDamageTypePhysical};
        }
        &[type="Magical"] {
            color: ${constants.colorDamageTypeMagical};
        }
    }
`;

const AbilityBehaviour = ({ ability }: any) => (
  <Behavior>
    {ability.behavior ? <div><span>TARGET: </span><span>{formatValues(ability.behavior)}</span></div> : ''}
    {/*@ts-ignore*/}
    {ability.dmg_type ? <div><span>DAMAGE TYPE: </span><span type={ability.dmg_type}>{`${ability.dmg_type}`}</span></div> : ''}
    {/*@ts-ignore*/}
    {ability.bkbpierce ? <div><span>PIERCES DEBUFF IMMUNITY: </span><span type={ability.bkbpierce}>{`${ability.bkbpierce}`}</span></div> : ''}
    {/*@ts-ignore*/}
    {ability.dispellable ? <div><span>DISPELLABLE: </span><span type={ability.dispellable}>{`${ability.dispellable}`}</span></div> : ''}
  </Behavior>
)

export default AbilityBehaviour;

AbilityBehaviour.propTypes = {
  ability: propTypes.shape({}).isRequired,
};
