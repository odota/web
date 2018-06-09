import React from 'react'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
import uuid from 'uuid'

const Wrapper = styled.div`
  
`

const AbilityIcon = styled.img`
  border-radius: 4px;
  height: auto;
  width: 100%;
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
  console.log(props)

  return (
    <Wrapper data-tip={true} data-for={ttId}>
      <AbilityIcon src={process.env.REACT_APP_API_HOST + props.img} />
      <ReactTooltip id={ttId} effect="solid" place="bottom">
        <AbilityTooltip ability={props} />
      </ReactTooltip>
    </Wrapper>
  )
}

export default Ability
