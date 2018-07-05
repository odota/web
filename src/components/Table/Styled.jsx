import styled from 'styled-components';
import constants from '../constants';

export const StyledBody = styled.div`
  table {
    background-color: transparent !important;
    table-layout: auto !important;
    margin-bottom: 20px;

    & th {
      background-color: rgba(0, 0, 0, 0.3);

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

    & tr {
      &:nth-child(odd) {
        background-color: rgba(255, 255, 255, 0.019);
      }

      &:nth-child(even) {
        background-color: rgba(0, 0, 0, 0.019);
      }

      & td {
        border-top: 1px solid rgba(255, 255, 255, 0.06) !important;
        border-bottom: 0 !important;
      }
    }

    & th,
    & td {
      padding-left: 8px !important;
      padding-right: 8px !important;

      &:first-child {
        padding-left: 24px !important;
      }

      &:last-child {
        padding-right: 24px !important;
      }
    }
  }
  /* Override material-ui style */

  .innerContainer > div > div {
    overflow-y: hidden !important;
    overflow-x: auto !important;
  }
  @media only screen and (max-width: 960px) {
    .innerContainer {
      margin: 0 -25px;
    }
  }
  ${props => (props.hoverRowColumn ? `
  & tr {
    :hover {
      background: rgba(190, 190, 140, 0.07) !important;
      transition: background 100ms linear !important;
    }   
  }

  & td.col_highlight, th.col_highlight {
     background: rgba(190, 190, 190, 0.07) !important;
     transition: background 100ms linear !important;
  }
  ` : '')};

  .scrolled .textContainer {
    width: 70px !important;
    margin-right: 8px !important;
  }

  .scrolled .textContainer span {
    overflow: hidden !important;
    white-space: nowrap !important;
    text-overflow: ellipsis !important;
  }

/* -- scrolling behavior -- */
  .scrolled .textContainer {
    & .registered {
      display: none;
    }

    & .badge {
      display: none;
    }
  }

  .scrolled .imageContainer {
    & img {
      margin-right: 3px;
      height: 15px;
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
    background-color: rgb(33, 34, 44, 0.8) !important;
    z-index: 100;
    transition: all 0.5s ease-out !important;
  }

  .scrolled tr {
    &:nth-child(odd) {
      & td:first-child {
        background-color: rgb(33, 34, 44, 0.8) !important;
        z-index: 100;
        transition: all 0.5s ease-out !important;
      }
    }

    &:nth-child(even) {
      & td:first-child {
        background-color: rgb(33, 34, 44, 0.8) !important;
        z-index: 100;
        transition: all 0.5s ease-out !important;
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
