import styled from 'styled-components';
import constants from '../constants';

export const StyledDiv = styled.div`
  .autocomplete:hover label {
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

export const autoCompleteStyle = {
  paddingRight: '20px',
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

