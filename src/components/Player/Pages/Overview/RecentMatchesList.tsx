import React, { useEffect, useState } from "react";
import HistoryIcon from "@mui/icons-material/History";
import { FromNowTooltip } from "../../../Visualizations";
import { Link } from "react-router-dom";
import { IconRadiant, IconDire } from "../../../Icons";
import { isRadiant } from "../../../../utility";
import Pagination from "../../../Table/Pagination";
import useStrings from "../../../../hooks/useStrings.hook";
import recentMatchesColumns from "./recentMatchesColumns";

const PAGE_LENGTH = 20;

const RecentMatchesList = ({ data }: { data: any[] }) => {
  const strings = useStrings();
  const [page, setPage] = useState(0);
  useEffect(() => setPage(0), [data]);
  const columns = recentMatchesColumns(strings);
  const currentPage = Math.min(page, Math.max(0, Math.ceil(data.length / PAGE_LENGTH) - 1));
  const renderDetail = (match: any, index: number) => {
    const column = columns[index];
    return (column.displayFn as Function)(match, column, match[column.field]);
  };

  return (
    <div className="recent-matches">
      <ul className="match-list">
        {data.slice(currentPage * PAGE_LENGTH, (currentPage + 1) * PAGE_LENGTH).map((match) => (
          <li className="match-entry" key={match.match_id}>
            <Link
              className="match-entry-link"
              to={`/matches/${match.match_id}`}
              aria-label={`${strings.heading_matches} ${match.match_id}`}
            />
            <div className="match-entry-header">
              <div className="match-identity">
                <Link className="match-link" to={`/matches/${match.match_id}`}>
                  #{match.match_id}
                </Link>
                <div className="match-hero">{renderDetail(match, 0)}</div>
              </div>

              {renderDetail(match, 1)}
            </div>
            <div className="match-entry-details">
          {typeof match.player_slot === "number" && (
            <span className={`team-value ${isRadiant(match.player_slot) ? "radiant" : "dire"}`}>
              {isRadiant(match.player_slot) ? <IconRadiant /> : <IconDire />}
              {isRadiant(match.player_slot) ? "Team Radiant" : "Team Dire"}
            </span>
          )}
              {renderDetail(match, 2)}
              {(match.is_roaming || match.lane_role > 0) && (
                <span className="lane-value">
                  <img
                    src={`/assets/images/dota2/lane_${match.is_roaming ? "roam" : match.lane_role}.svg`}
                    alt=""
                  />
                  {match.is_roaming
                    ? strings.roaming
                    : `${strings[`lane_role_${match.lane_role}` as keyof Strings]} Lane`}
                </span>
              )}
              <div className="match-stat">
                <span className="stat-label">K / D / A</span>
                {renderDetail(match, 4)}
              </div>
              <div className="match-stat">
                {renderDetail(match, 3)}
              </div>
              <span className="recent-time-ago">
                <HistoryIcon aria-hidden="true" />
                <FromNowTooltip timestamp={match.start_time + match.duration} />
              </span>
            </div>

          </li>
        ))}
      </ul>
      {data.length > PAGE_LENGTH && (
        <Pagination
          numPages={Math.ceil(data.length / PAGE_LENGTH)}
          currentPage={currentPage}
          nextPage={() => setPage(currentPage + 1)}
          prevPage={() => setPage(currentPage - 1)}
          setCurrentPage={setPage}
          place="bot"
          pageLength={PAGE_LENGTH}
          length={data.length}
        />
      )}
    </div>
  );
};

export default RecentMatchesList;
