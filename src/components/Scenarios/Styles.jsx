import styled from 'styled-components';
import constants from '../constants';

export const StyledDiv = styled.div`
  .filter > label {
    color: rgba(255, 255, 255, 0.3) !important;
  }
  .query:hover label {
    color: ${constants.colorBlue} !important;
  }
  .filter:hover label {
    color: ${constants.colorMutedLight} !important;
  }
  small {
    font-size: xx-small !important;
  }
  .tab:hover { 
    color: ${constants.colorMutedLight} !important; 
    svg {
      fill: ${constants.colorMutedLight} !important;
      line {
        transition: ${constants.normalTransition} !important;  
        stroke: ${constants.colorMutedLight} !important;
      }
    }
  }
  .filter > div > hr:nth-child(2) {
    border-bottom-color: ${constants.colorMutedLight} !important;
  }
}
`;

export const buttonStyle = {
  marginTop: '20px',
  marginBottom: '20px',
};

export const formFieldStyle = {
  display: 'flex',
  flexWrap: 'wrap',
};

export const tabsStyle = {
  marginBottom: '50px',
  marginTop: '10px',
  borderBottom: `1px solid ${constants.dividerColor}`,
};

export const listStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.35)',
  maxHeight: 400,
  overflow: 'auto',
};
