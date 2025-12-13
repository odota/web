import React from "react";
import styled from "styled-components";

const Wrapper = styled.span`
  background: rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;

  &:nth-child(2n) {
    background: rgba(0, 0, 0, 0.15);
  }
`;

const Attribute = ({
  style,
  children,
}: {
  style?: any;
  children: React.ReactNode;
}) => <Wrapper style={style}>{children}</Wrapper>;

export default Attribute;
