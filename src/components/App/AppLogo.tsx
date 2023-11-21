import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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

interface AppLogoProps {
  size: string
  strings: { [key: string]: string }
  onClick: () => void
}

const AppLogo = ({ size, strings, onClick }: AppLogoProps) => (
  <StyledLink aria-label="Go to the Open Dota homepage" to="/" onClick={onClick}>
    <span style={{ fontSize: size }}>
      {strings.app_name && `<${strings.app_name}/>`}
    </span>
  </StyledLink>
);

const mapStateToProps = (state: any) => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(AppLogo);
