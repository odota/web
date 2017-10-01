import React from 'react';
import { Link } from 'react-router-dom';
import strings from 'lang';
import styled from 'styled-components';
import constants from '../constants';

const StyledLink = styled(Link)`
  font-weight: ${constants.fontWeightMedium};
  color: ${constants.textColorPrimary};
  text-transform: uppercase;

  &:hover {
    color: ${constants.textColorPrimary};
    opacity: 0.6;
  }
`;

export default ({ size }) => (
  <StyledLink to="/">
    <big style={{ fontSize: size }}>
      {`<${strings.app_name}/>`}
    </big>
  </StyledLink>
);
