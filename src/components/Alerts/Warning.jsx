import React from 'react';
import PropTypes from 'prop-types';
import AlertWarning from 'material-ui/svg-icons/alert/warning';
import styled from 'styled-components';
import constants from '../constants';

const StyledDiv = styled.div`
  font-weight: ${constants.fontWeightLight};
  font-size: ${constants.fontSizeMedium};
  letter-spacing: 0.1ex;

  & svg {
    vertical-align: sub;
    margin-right: 5px;
    width: 20px !important;
    height: 20px !important;
    fill: ${constants.colorYelor} !important;
  }
  color: ${constants.colorYelor};
`;

const Warning = ({ children, className, msg }) => (
  <StyledDiv className={`${className}`}>
    <AlertWarning />
    <span>
      {!children && msg}
      {!msg && children}
    </span>
  </StyledDiv>
);

Warning.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  msg: PropTypes.string,
};

export default Warning;
