import React, { useCallback, useState, useEffect } from 'react';
import useReactRouter from 'use-react-router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Tooltip, Tab, Tabs } from '@material-ui/core';
import constants from '../constants';

const StyledMain = styled.main`
  position: relative;
  margin: 10px 0 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.19);
`;

const StyledTabs = styled(Tabs)`
  & .MuiTabs-indicator {
    background: ${constants.primaryLinkColor};
  }
`;

const StyledTab = styled(Tab)`
  min-width: 0 !important;
`;

const TabTooltip = ({ title, children }) => (title ? <Tooltip title={title}>{children}</Tooltip> : children);

TabTooltip.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

const TabBar = ({ tabs, match }) => {
  const [tabValue, setTabValue] = useState(0);
  const { history, location } = useReactRouter();

  useEffect(() => {
    tabs.forEach((tab, i) => {
      if (location.pathname === tab.route) setTabValue(i);
    });
  }, []);

  const handleTabClick = useCallback((e, tab, index) => {
    e.preventDefault();
    history.push(e.currentTarget.getAttribute('href'));
    setTabValue(index);
  }, [history]);

  return (
    <StyledMain>
      <StyledTabs
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        variant="scrollable"
        indicatorColor="primary"
      >
        {tabs.map((tab, i) => (!tab.hidden || (tab.hidden && !tab.hidden(match))) && (
          <TabTooltip title={tab.tooltip} key={`${tab.name}_${tab.route}_${tab.key}`}>
            <StyledTab
              component="a"
              href={tab.route + window.location.search}
              onClick={e => handleTabClick(e, tab, i)}
              label={tab.name}
              disabled={tab.disabled}
            />
          </TabTooltip>
        ))}
      </StyledTabs>
    </StyledMain>
  );
};

const { shape, arrayOf } = PropTypes;
TabBar.propTypes = {
  tabs: arrayOf(shape({})),
  match: shape({}),
};

export default TabBar;
