import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import constans from '../constants';

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
    font-weight: ${constans.fontWeightLight};
    font-size: 14px;
    color: ${constans.primaryTextColor};
    padding: 10px 12px 16px;
    border-bottom: 2px solid transparent;
    flex-grow: 1;

    &:hover {
      color: ${constans.colorMutedLight};
    }

    &[disabled] {
      pointer-events: none;
      color: ${constans.colorMuted};
    }

    @media only screen and (max-width: 768px) {
      padding-left: 10px;
      padding-right: 10px;
    }
  }

  & .chosen {
    display: inline-block;
    border-color: ${constans.primaryLinkColor};
    color: color(${constans.colorMuted} lightness(85%));
  }
`;

const TabBar = ({ tabs, info }) => (
  <StyledMain>
    <StyledSection>
      {tabs.map(tab => (
        <Link
          key={`${tab.name}_${tab.route}_${tab.key}`}
          className={tab.key === info ? 'chosen' : ''}
          to={tab.route + window.location.search}
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
