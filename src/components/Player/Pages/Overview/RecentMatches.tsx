import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import TableRowsIcon from "@mui/icons-material/TableRows";
import { Link } from "react-router-dom";
import Container from "../../../Container/Container";
import Table from "../../../Table/Table";
import useStrings from "../../../../hooks/useStrings.hook";
import { transformations } from "../../../../utility";
import RecentMatchesList from "./RecentMatchesList";
import recentMatchesColumns from "./recentMatchesColumns";
import playerMatchesColumns from "../Matches/playerMatchesColumns";
import constants from "../../../constants";

const RecentMatches = ({ data, playerId, loading, error }: {
  data: any[];
  playerId: string;
  loading: boolean;
  error: string;
}) => {
  const strings = useStrings();
  const [view, setView] = useState<"list" | "table">("list");
  const columns = recentMatchesColumns(strings);

  return (
    <Container
      title={strings.heading_matches}
      titleTo={`/players/${playerId}/matches`}
      loading={loading}
      error={error}
      titleActions={
      <ToggleButtonGroup
        exclusive
        size="small"
        value={view}
        onChange={(_, nextView: "list" | "table" | null) => {
          if (nextView) setView(nextView);
        }}
        aria-label="Recent matches view"
        sx={{
          flexShrink: 0,
          padding: "3px",
          gap: "3px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "8px",
          backgroundColor: "rgba(0, 0, 0, 0.18)",
          "& .MuiToggleButton-root": {
            margin: "0 !important",
            padding: "4px 10px",
            border: "0 !important",
            borderRadius: "5px !important",
            fontFamily: constants.fontFamilyFuturistic,
            fontSize: "12px",
            lineHeight: 1.4,
            textTransform: "none",
            color: constants.colorMutedLight,
            transition: "background-color 150ms ease, color 150ms ease",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.06)", color: constants.colorWhite },
            "&.Mui-selected": {
              color: constants.primaryLinkColor,
              backgroundColor: "rgba(46, 160, 214, 0.16)",
              boxShadow: "inset 0 0 0 1px rgba(46, 160, 214, 0.25)",
              "&:hover": { backgroundColor: "rgba(46, 160, 214, 0.23)" },
            },
            "&.Mui-focusVisible": { outline: `2px solid ${constants.primaryLinkColor}`, outlineOffset: "2px" },
          },
          "& .MuiSvgIcon-root": { fontSize: "16px" },
        }}
      >
        <ToggleButton value="list" aria-label="List view">
          <ViewListIcon sx={{ marginRight: 0.5 }} />
          List
        </ToggleButton>
        <ToggleButton value="table" aria-label="Table view">
          <TableRowsIcon sx={{ marginRight: 0.5 }} />
          Table
        </ToggleButton>
      </ToggleButtonGroup>
      }
    >
      <div className="recent-matches">
      {view === "list" ? (
        <RecentMatchesList data={data} />
      ) : (
        <Table
          className="recent-matches-table"
          overflowAuto
          data={data}
          paginated={data.length > 20}
          pageLength={20}
          keyFn={(match: any) => match.match_id}
          columns={[
            playerMatchesColumns(strings, false)[0],
            {
              displayName: strings.match_id,
              field: "match_id",
              sortFn: true,
              displayFn: (match: any) => (
                <Link to={`/matches/${match.match_id}`}>#{match.match_id}</Link>
              ),
            },
            ...columns.slice(1),
            {
              displayName: strings.th_time,
              field: "start_time",
              sortFn: true,
              displayFn: (match: any) => transformations.start_time(
                match, null, match.start_time + match.duration,
              ),
            },
          ]}
        />
      )}
      </div>
    </Container>
  );
};

export default RecentMatches;
