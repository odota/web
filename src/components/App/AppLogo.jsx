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

const AppLogo = ({ size, strings }) => (
  <StyledLink to="/">
    <big style={{ fontSize: size }}>
      {`<${strings.app_name}/>`}
    </big>
  </StyledLink>
);

AppLogo.propTypes = {
  size: PropTypes.string,
  strings: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(AppLogo);
