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
