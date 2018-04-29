import React from 'react';
import { shape, bool, node } from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.span`
  background: rgba(0, 0, 0, .05);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;

  &:nth-child(2n) {
    background: rgba(0, 0, 0, .15);
  }
`;

const Attribute = ({
  style, primary, children,
}) => (
  <Wrapper style={style} primary={primary}>
    {children}
  </Wrapper>
);

Attribute.propTypes = {
  style: shape({}),
  primary: bool,
  children: node,
};

export default Attribute;
