import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fromNow } from '../../utility';

const StyledDiv = styled.div`
  position: relative;
  cursor: default;

  &[data-hint-position="top"]::after {
    margin-left: -10px;
    left: 0;
  }
`;

const FromNowTooltip = ({ timestamp }) => (
  <StyledDiv
    data-hint={
      // Country Code Language List http://www.fincher.org/Utilities/CountryLanguageList.shtml
      new Date(Number(timestamp) * 1000).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    }
    data-hint-position="top"
  >
    {fromNow(timestamp)}
  </StyledDiv>
);

FromNowTooltip.propTypes = {
  timestamp: PropTypes.number,
};

export default FromNowTooltip;
