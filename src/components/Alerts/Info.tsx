import React from 'react';
import InfoIcon from '@mui/icons-material/Info';
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

const Info = ({
  children,
  className,
  msg,
}: {
  children: React.ReactNode;
  className?: string;
  msg?: string;
}) => (
  <StyledDiv className={`${className}`}>
    <InfoIcon />
    <span>
      {!children && msg}
      {!msg && children}
    </span>
  </StyledDiv>
);

export default Info;
