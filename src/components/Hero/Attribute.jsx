import React from 'react';
import { oneOf, oneOfType, string, number, shape } from 'prop-types';
import styled from 'styled-components';
import AttrStrength from 'components/Icons/AttrStrength';
import AttrAgility from 'components/Icons/AttrAgility';
import AttrIntelligent from 'components/Icons/AttrIntelligent';

const Wrapper = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TYPES = {
  str: 'str',
  agi: 'agi',
  int: 'int',
};

const Attribute = ({
  type, base, gain, style, iconSize,
}) => {
  let Attr = null;
  switch (type) {
    case TYPES.str:
      Attr = AttrStrength;
      break;
    case TYPES.agi:
      Attr = AttrAgility;
      break;
    case TYPES.int:
      Attr = AttrIntelligent;
      break;
    default:
      return null;
  }

  return (
    <Wrapper style={style}>
      <Attr style={{ width: iconSize, marginRight: 4 }} /> {base} + {gain}
    </Wrapper>
  );
};

Attribute.propTypes = {
  type: oneOf([...Object.keys(TYPES)]),
  base: oneOfType([string, number]),
  gain: oneOfType([string, number]),
  style: shape({}),
  iconSize: number,
};

Attribute.defaultProps = {
  iconSize: 20,
};

export default Attribute;
