import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import constants from '../constants';
import strings from '../../lang';

const StyledLink = styled(Link)`
  font-weight: ${constants.fontWeightMedium};
  color: ${constants.textColorPrimary};
  text-transform: uppercase;

  &:hover {
    color: ${constants.textColorPrimary};
    opacity: 0.6;
  }
`;

const AppLogo = ({ size }) => (
  <StyledLink to="/">
    <big style={{ fontSize: size }}>
      {`<${strings.app_name}/>`}
    </big>
  </StyledLink>
);

AppLogo.propTypes = {
  size: PropTypes.string,
};

export default AppLogo;
