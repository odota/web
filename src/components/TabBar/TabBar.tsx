import { Tab, Tabs, Tooltip } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import constants from "../constants";
import { withRouter } from "react-router-dom";
import styles from "./TabBar.module.css";

const TabTooltip = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactElement<any, any>;
}) => (title ? <Tooltip title={title}>{children}</Tooltip> : children);

const TabBar = ({
  tabs,
  matchData,
  history,
  location,
}: { tabs: any[]; matchData?: Match } & RouterProps) => {
  const [tabValue, setTabValue] = useState(0);
  const visibleTabs = useMemo(
    () =>
      tabs.filter(
        (tab) => !tab.hidden || (tab.hidden && !tab.hidden(matchData)),
      ),
    [matchData, tabs],
  );

  useEffect(() => {
    const newTabIndex = visibleTabs.findIndex((tab) =>
      location.pathname.startsWith(tab.route),
    );
    setTabValue(newTabIndex !== -1 ? newTabIndex : 0);
  }, [visibleTabs, history, location.pathname]);

  const handleTabClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, tab: any, index: number) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute("href");
      if (href) {
        history.push(href);
      }
      setTabValue(index);
    },
    [history],
  );

  return (
    <main className={styles.styledMain}>
      <Tabs
        className={styles.styledTabs}
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
            <Tab
              className={styles.styledTab}
              component="a"
              href={tab.route + window.location.search}
              onClick={(e) => handleTabClick(e, tab, i)}
              label={tab.name}
              disabled={tab.disabled}
              sx={{
                fontFamily: constants.fontFamilyFuturistic,
                fontSize: constants.fontSizeSmall,
                letterSpacing: "0.02em",
                textTransform: "capitalize",
              }}
            />
          </TabTooltip>
        ))}
      </Tabs>
    </main>
  );
};

export default withRouter(TabBar);
