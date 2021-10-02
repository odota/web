import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

const AppLogo = ({ size, strings, onClick }) => (
  <StyledLink aria-label="Go to the Open Dota homepage" to="/" onClick={onClick}>
    <span style={{ fontSize: size }}>
      {strings.app_name && `<${strings.app_name}/>`}
    </span>
  </StyledLink>
);

AppLogo.propTypes = {
  size: PropTypes.string,
  strings: PropTypes.shape({}),
  onClick: PropTypes.func,
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(AppLogo);
