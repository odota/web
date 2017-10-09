import React from 'react';
import PropTypes from 'prop-types';
import ActionInfo from 'material-ui/svg-icons/action/info';
import styled from 'styled-components';
import constants from '../constants';

const StyledDiv = styled.div`
  & a {
    color: ${constants.colorMutedLight};
    font-size: ${constants.fontSizeSmall};
  }

  & svg {
    vertical-align: sub;
    margin-right: 5px;
    width: 15px !important;
    height: 15px !important;
    fill: ${constants.colorBlue} !important;
  }
`;

const Info = ({ children, className, msg }) => (
  <StyledDiv className={`${className}`}>
    <ActionInfo />
    <span>
      {!children && msg}
      {!msg && children}
    </span>
  </StyledDiv>
);

Info.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  msg: PropTypes.string,
};

export default Info;
