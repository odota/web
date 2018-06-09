import React from 'react'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
import uuid from 'uuid'

import constants from '../constants'

const Wrapper = styled.div`
  background: linear-gradient(to bottom, ${constants.colorBlueMuted}, ${constants.primarySurfaceColor});
  border-radius: 4px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
  position: relative;
`

const AbilityIcon = styled.img`
  border-radius: 4px;
  display: block;
  height: auto;
  opacity: .7;
  overflow: hidden;
  transition: opacity .2s;
  width: 100%;

  &:hover {
    opacity: 1;
  }
`

const AbilityManaComsumption = styled.div`
  background: ${constants.colorBlackMuted};
  color: ${constants.colorMana};
  border-radius: 2px 0 0 0;
  font-weight: 600;
  bottom: 0;
  font-size: 10px;
  line-height: 1;
  padding: 1px 4px;
  position: absolute;
  right: 0;
`

const TooltipWrapper = styled.div`
  max-width: 350px;
`

const TooltipTitle = styled.h3`
  text-transform: uppercase;
  margin-bottom: 0;
`

const TooltipDescription = styled.p`
  opacity: .6;
  margin: 0;
`

const TooltipBehavior = styled.div`
  font-size: 12px;
  margin: 8px 0;
  text-transform: uppercase;
`

const TooltipFooter = styled.div`
  border-top: 1px solid rgba(255, 255, 255, .15);
  margin-top: 16px;
  padding-top: 8px;
`

const AbilityTooltip = ({ability}) => {
  const behavior = (typeof ability.behavior === 'object') ? ability.behavior.join(' ') : ability.behavior
  return (
    <TooltipWrapper>
      <TooltipTitle>{ability.dname}</TooltipTitle>
      <TooltipDescription>{ability.desc}</TooltipDescription>
      <TooltipBehavior>{behavior}</TooltipBehavior>
      <TooltipFooter>
      </TooltipFooter>
    </TooltipWrapper>
  )
}

const Ability = (props, abilityID) => {
  const ttId = uuid.v4()
  const showMana = (props.mc && parseInt(props.mc) > 0)
  let manaString = false
  
  if (showMana) {
    manaString = ((typeof props.mc === 'object') ? props.mc[0] : props.mc)
  }

  return (
    <Wrapper data-tip={true} data-for={ttId}>
      <AbilityIcon src={process.env.REACT_APP_API_HOST + props.img} />
      <ReactTooltip id={ttId} effect="solid" place="bottom">
        <AbilityTooltip ability={props} />
      </ReactTooltip>
      {(showMana) && <AbilityManaComsumption>{manaString}</AbilityManaComsumption>}
    </Wrapper>
  )
}

export default Ability
