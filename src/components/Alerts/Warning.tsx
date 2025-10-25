import React from 'react';
import WarningIcon from '@mui/icons-material/Warning';
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

const Warning = ({
  children,
  className,
  msg,
}: {
  children: React.ReactNode;
  className: string;
  msg?: string;
}) => (
  <StyledDiv className={`${className}`}>
    <WarningIcon />
    <span>
      {!children && msg}
      {!msg && children}
    </span>
  </StyledDiv>
);

export default Warning;
