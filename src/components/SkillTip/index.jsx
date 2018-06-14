import React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'

import FooterItem from './FooterItem'

const Wrapper = styled.div`
  max-width: 350px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, .6);
`

const Title = styled.h3`
  font-size: 14px;
  letter-spacing: 1px;
  margin-bottom: 4px;
  margin: 0;
  text-transform: uppercase;
`

const Description = styled.p`
  opacity: .6;
  margin: 0;
`

const Behavior = styled.div`
  font-size: 12px;
  margin: 8px 0;
  text-transform: uppercase;
`

const Footer = styled.div`
  border-top: 1px solid rgba(255, 255, 255, .15);
  margin-top: 4px;
  padding-top: 4px;
`

const renderAttributes = (attributes) => {
  return attributes.map((attr, key) => {
    return <FooterItem title={attr.header} content={attr.value} />
  })
}

const SkillTip = ({ability, position, ttId}) => {
  const behavior = (typeof ability.behavior === 'object') ? ability.behavior.join(' ') : ability.behavior
  console.log(ability)

  return (
    <ReactTooltip id={ttId} effect="solid" place={position}>
      <Wrapper>
        <Title>{ability.dname}</Title>
        <Description>{ability.desc}</Description>
        <Behavior>{behavior}</Behavior>
        <Footer>
          { renderAttributes(ability.attrib) }
          { (ability.mc) && <FooterItem title="Mana Consumption" content={ability.mc} /> }
        </Footer>
      </Wrapper>
    </ReactTooltip>
  )
}

SkillTip.propTypes = {
  ability: propTypes.shape({}).isRequired,
  position: propTypes.string,
  ttId: propTypes.string.isRequired
}

SkillTip.defaultProps = {
  ability: null,
  position: 'bottom',
  ttId: null
}

export default SkillTip
