import React from 'react';
import { oneOf, oneOfType, string, number, shape, bool } from 'prop-types';
import styled from 'styled-components';
import AttrStrength from 'components/Icons/AttrStrength';
import AttrAgility from 'components/Icons/AttrAgility';
import AttrIntelligent from 'components/Icons/AttrIntelligent';

const Wrapper = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: ${props => (props.primary ? 'bold' : null)};
`;

export const TYPES = {
  str: 'str',
  agi: 'agi',
  int: 'int',
};

const Attribute = ({
  type, value, style, iconSize, primary,
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
      // TODO: delete this hack
      Attr = () => <span style={{ marginRight: 5 }}>{type}</span>;
      break;
  }

  return (
    <Wrapper style={style} primary={primary}>
      <Attr style={{ width: iconSize, marginRight: 4 }} /> {value}
    </Wrapper>
  );
};

Attribute.propTypes = {
  type: oneOf([...Object.keys(TYPES)]),
  value: oneOfType([string, number]),
  style: shape({}),
  iconSize: number,
  primary: bool,
};

Attribute.defaultProps = {
  iconSize: 20,
};

export default Attribute;
