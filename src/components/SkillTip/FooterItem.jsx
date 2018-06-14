import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  margin: 4px 0;
`

const Title = styled.div`
  flex: 0 0 auto;
  font-weight: 600;
  margin-right: 12px;
  font-size: 12px;
  text-transform: uppercase;
`

const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
  font-size: 12px;
`

const ContentItem = styled.div`
  flex: 0 0 auto;
  margin: 0 4px;
`

const renderContent = (content) => {
  return (typeof content === 'string') ? content : content.map((item, key) => {
    return <ContentItem key={key}>{item}</ContentItem>
  })
}

const FooterItem = ({icon, title, content}) => (
  <Wrapper>
    { (icon) && <Icon src={icon} /> }
    { (title) && <Title>{title}</Title> }
    <Content>{renderContent(content)}</Content>
  </Wrapper>
)

export default FooterItem
