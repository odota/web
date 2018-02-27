import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import querystring from 'querystring';
import constants from '../constants';

const StyledMain = styled.main`
  position: relative;
  margin: 10px 0 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.19);
`;
const StyledSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

  & a {
    /* Tab */
    text-align: center;
    font-weight: ${constants.fontWeightLight};
    font-size: 14px;
    color: ${constants.primaryTextColor};
    padding: 10px 12px 16px;
    border-bottom: 2px solid transparent;
    flex-grow: 1;

    &:hover {
      color: ${constants.colorMutedLight};
    }

    &[disabled] {
      pointer-events: none;
      color: ${constants.colorMuted};
    }

    @media only screen and (max-width: 768px) {
      padding-left: 10px;
      padding-right: 10px;
    }
  }

  & .chosen {
    display: inline-block;
    border-color: ${constants.primaryLinkColor};
    color: color(${constants.colorMuted} lightness(85%));
  }
`;

const filteredURLSearchParams = () => {
  const PARAMS_TO_IGNORE = [constants.PAGINATION_PAGE_NUMBER, constants.PAGINATION_PAGE_SIZE];
  const params = querystring.parse(window.location.search.substring(1));
  PARAMS_TO_IGNORE.forEach(key => delete params[key]);
  return querystring.encode(params);
};

const TabBar = ({ tabs, info }) => (
  <StyledMain>
    <StyledSection>
      {tabs.map(tab => (
        <Link
          key={`${tab.name}_${tab.route}_${tab.key}`}
          className={tab.key === info ? 'chosen' : ''}
          to={tab.route + filteredURLSearchParams()}
          disabled={tab.disabled}
        >
          {tab.name}
        </Link>
      ))}
    </StyledSection>
  </StyledMain>
);

const { string, shape, arrayOf } = PropTypes;
TabBar.propTypes = {
  tabs: arrayOf(shape({})),
  info: string,
};

export default TabBar;
