import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import constants from '../constants';
import useStrings from '../../hooks/useStrings.hook';

const StyledLink = styled(Link)`
  font-weight: ${constants.fontWeightMedium};
  color: ${constants.textColorPrimary};
  text-transform: uppercase;

  &:hover {
    color: ${constants.textColorPrimary};
    opacity: 0.6;
  }
`;

interface AppLogoProps {
  size?: string;
  onClick?: () => void;
}

const AppLogo = ({ size, onClick }: AppLogoProps) => {
  const strings = useStrings();
  return <StyledLink
    aria-label="Go to the Open Dota homepage"
    to="/"
    onClick={onClick}
  >
    <span style={{ fontSize: size }}>
      {strings.app_name && `<${strings.app_name}/>`}
    </span>
  </StyledLink>;
};

export default AppLogo;
