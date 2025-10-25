import { Tab, Tabs, Tooltip } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import constants from '../constants';
import { withRouter } from 'react-router-dom';

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

const TabTooltip = ({ title, children }: { title: string, children: React.ReactElement<any, any> }) =>
  title ? <Tooltip title={title}>{children}</Tooltip> : children;

const TabBar = ({ tabs, matchData, history, location }: { tabs: any[], matchData?: Match } & RouterProps) => {
  const [tabValue, setTabValue] = useState(0);
  const visibleTabs = useMemo(
    () =>
      tabs.filter((tab) => !tab.hidden || (tab.hidden && !tab.hidden(matchData))),
    [matchData, tabs],
  );

  useEffect(() => {
    const newTabIndex = visibleTabs.findIndex(
      (tab) => location.pathname.startsWith(tab.route),
    );
    setTabValue(newTabIndex !== -1 ? newTabIndex : 0);
  }, [visibleTabs, history, location.pathname]);

  const handleTabClick = useCallback(
    (e, tab, index) => {
      e.preventDefault();
      history.push(e.currentTarget.getAttribute('href'));
      setTabValue(index);
    },
    [history],
  );

  return (
    <StyledMain>
      <StyledTabs
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        variant="scrollable"
        indicatorColor="primary"
      >
        {visibleTabs.map((tab, i) => (
          <TabTooltip
            title={tab.tooltip}
            key={`${tab.name}_${tab.route}_${tab.key}`}
          >
            <StyledTab
              //@ts-expect-error
              component="a"
              href={tab.route + window.location.search}
              onClick={(e) => handleTabClick(e, tab, i)}
              label={tab.name}
              disabled={tab.disabled}
            />
          </TabTooltip>
        ))}
      </StyledTabs>
    </StyledMain>
  );
};

export default withRouter(TabBar);
