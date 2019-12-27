import React from 'react';
import { shape, bool, string, number } from 'prop-types';
import styled from 'styled-components';

import constants from '../constants';

const Wrapper = styled.div`
  flex: 1 1 0;
  padding: 0 16px;
  display: flex;
  align-items: center;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }

  @media screen and (max-width: ${constants.wrapTablet}) {
    padding: 4px 0;
  }

  @media screen and (max-width: ${constants.wrapMobile}) {
    display: block;
    padding: 0;
    text-align: center;
  }
`;

const AttributeDot = styled.div`
  border-radius: 50%;
  flex-shrink: 0;
  height: 8px;
  margin-right: 8px;
  width: 8px;

  @media screen and (max-width: ${constants.wrapMobile}) {
    display: inline-block;
    vertical-align: middle;
  }
`;

const AttributeValue = styled.div`
  color: ${props => ((props.isPrimary) ? constants.colorAttributes[props.attribute] : constants.primaryTextColor)};
  flex-shrink: 0;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;

  @media screen and (max-width: ${constants.wrapMobile}) {
    display: inline-block;
    vertical-align: middle;
  }
`;

const AttributeMain = ({
  style, attribute, isPrimary, base, gain,
}) => {
  const attributeDotStyle = {
    background: constants.primaryTextColor,
  };

  const attributeValueStyle = {
    color: constants.primaryTextColor,
  };

  switch (attribute) {
    default:
      attributeDotStyle.background = constants.colorAttributeStr;
      if (isPrimary) {
        attributeValueStyle.color = constants.colorAttributeStr;
      }
      break;

    case 'agi':
      attributeDotStyle.background = constants.colorAttributeAgi;
      if (isPrimary) {
        attributeValueStyle.color = constants.colorAttributeAgi;
      }
      break;

    case 'int':
      attributeDotStyle.background = constants.colorAttributeInt;
      if (isPrimary) {
        attributeValueStyle.color = constants.colorAttributeInt;
      }
      break;
  }

  return (
    <Wrapper style={style}>
      <AttributeDot attribute={attribute} style={attributeDotStyle} />
      <AttributeValue attribute={attribute} style={attributeValueStyle}>{base} + {gain}</AttributeValue>
    </Wrapper>
  );
};

AttributeMain.propTypes = {
  style: shape({}),
  attribute: string,
  isPrimary: bool,
  base: number,
  gain: number,
};

export default AttributeMain;
