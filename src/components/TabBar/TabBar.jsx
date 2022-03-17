import { Tab, Tabs, Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import useReactRouter from 'use-react-router';

import constants from '../constants';

const StyledMain = styled.main`
  position: relative;
  margin: 0px 0px 30px 0px;
  background-color: rgba(14, 84, 113, 37%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  padding-top: 25px;
`;

const StyledTabs = styled(Tabs)`
  justify-content: center;

  & .MuiTabs-indicator {
    background: ${constants.primaryLinkColor};
  }
  & .MuiTabs-scroller {
    flex-grow: 0;
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
  const visibleTabs = useMemo(() => tabs.filter(tab => (!tab.hidden || (tab.hidden && !tab.hidden(match)))), [match, tabs]);

  useEffect(() => {
    const newTabIndex = visibleTabs.findIndex(tab => location.pathname === tab.route);
    setTabValue(newTabIndex !== -1 ? newTabIndex : 0);
  }, [visibleTabs, history, location.pathname]);

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
        {visibleTabs.map((tab, i) => (
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
