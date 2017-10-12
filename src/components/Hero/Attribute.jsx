import React from 'react';
import { shape, bool, node } from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: ${props => (props.primary ? 'bold' : null)};
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
