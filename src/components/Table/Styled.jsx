import styled from 'styled-components';
import constants from '../constants';

export const StyledBody = styled.div`
  table {
    table-layout: auto !important;
    font-family: ${constants.tableFontFamily} !important;
    box-sizing: border-box;

    ${props => (props.customWidth ? `
      table-layout: fixed !important;
      `
    : '')}
          
    thead {
      border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
         
      & tr {
        background: rgba(46, 160, 214, 0.26);
        background: -moz-linear-gradient(90deg, rgba(20,255,212,0.09) 2%, rgba(46,160,214,0.26) 27%, rgba(5,181,249,0.04) 80%);
        background: -webkit-linear-gradient(90deg, rgba(20,255,212,0.09) 2%, rgba(46,160,214,0.26) 27%, rgba(5,181,249,0.04) 80%); 
        background: linear-gradient(90deg, rgba(20,255,212,0.09) 2%, rgba(46,160,214,0.26) 27%, rgba(5,181,249,0.04) 80%);

        /* Safari */
        @media not all and (min-resolution:.001dpcm)
        { @supports (-webkit-appearance:none) {
          background: rgba(46, 160, 214, 0.26);
        }}
      }
    }

    tr {
      &:not(:last-child) {
        border-bottom: 1px solid rgba(255, 255, 255, .05) !important;
      }
    }

    & th {
      position: relative;

      svg {
        position: absolute;
        bottom: 0px;
        left: 0px;
      }

      & svg {
        vertical-align: top;
        margin-left: 2px;

        &:hover {
          cursor: pointer;
        }
      }

      & div[data-id='tooltip'] {
        text-transform: none !important;
        font-weight: var(--fontWeightNormal);
        text-align: left;
      }
    }


    & tbody tr {
      
      & td {
        border-bottom-width: 0px !important;
        border-top-width: 0px !important;
        
        & img, object {
            opacity: 0.9;
        }
      }
    }


    & th,
    & td {
      overflow: visible !important;

      &:first-child {
        padding-left: 24px !important;
      }

      &:last-child {
        padding-right: 24px !important;
      }
    }
  }
  /* Override material-ui style */


  .innerContainer {
    margin-bottom: 20px;
    border: 1px solid rgba(255, 255, 255, .05);
    border-radius: 3px;
  }

  .innerContainer {
    overflow-y: hidden !important;
    overflow-x: auto !important;
    @media only screen and (min-width: 1200px) { 
      overflow-x: hidden !important;
    }
  }

  .innerContainer.table-container-overflow-auto {
    overflow-x: auto !important;
  }

  @media only screen and (max-width: 960px) {
  }
  ${props => (props.hoverRowColumn ? `
  & tr {
    :hover {
      background: rgba(190, 190, 140, 0.07) !important;
    }   
  }

  & td.col_highlight, th.col_highlight {
     background: rgba(190, 190, 190, 0.07) !important;
     color: ${constants.textColorPrimary} !important;
  }
  ` : '')};

  /* -- scrolling behavior -- */
  .scrolled.shrink .textContainer {
    width: 40px !important;
    margin-right: 0px !important;
    height: 32px !important;
  }

  .scrolled .textContainer span {
    overflow: hidden !important;
    white-space: nowrap !important;
    text-overflow: ellipsis !important;
  }

  .scrolled .textContainer {
    & .registered {
      display: none !important;
    }

    & .badge {
      display: none !important;
    }

    & .rank {
      display: none !important;
    }

    & .contributor {
      display: none !important;
    }
  }

  .scrolled .guideContainer {
    & .moremmr-icon {
      display: none;
    }
  }

  .scrolled .imageContainer {
    & img {
      margin-right: 4px;
      height: 18px;
    }

    & .playerSlot {
      display: none;
    }
  }

  .scrolled th:first-child, .scrolled td:first-child {
    position: sticky !important;
    left: 0px !important;
  }

  .scrolled th:first-child {
    background-color: rgba(33, 34, 44, 0.8) !important;
    z-index: 100;
    transition: background-color 0.5s ease-out !important;
    width: 60px !important;
  }

  .scrolled tr {
    &:nth-child(odd) {
      & td:first-child {
        background-color: rgba(33, 34, 44, 0.8) !important;
        z-index: 100;
        transition: background-color 0.5s ease-out !important;
        padding-right: 0px !important;
        width: 60px !important;
      }
    }

    &:nth-child(even) {
      & td:first-child {
        background-color: rgba(33, 34, 44, 0.8) !important;
        z-index: 100;
        transition: background-color 0.5s ease-out !important;
        padding-right: 0px !important;
        width: 60px !important;
      }
    }
  }
`;
export const StyledContainer = styled.div`
  min-width: 100%;
  clear: both;
`;
export const StyledHeaderCell = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
  text-transform: uppercase;
  color: ${constants.primaryTextColor} !important;
  font-weight: 500;
`;
