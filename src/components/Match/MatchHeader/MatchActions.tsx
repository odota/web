import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import DataObjectIcon from "@mui/icons-material/DataObject";
import DownloadIcon from "@mui/icons-material/Download";
import useStrings from "../../../hooks/useStrings.hook";
import styles from "./MatchHeader.module.css";

/**
 * Displays the parse or reparse action and the replay download when available.
 * @param props Component props.
 * @param props.match The match that supplies the action links.
 * @returns The match action buttons.
 */
const MatchActions = ({ match }: { match: Match }) => {
  const strings = useStrings();
  return (
    <div className={styles.matchButtons}>
      <Button
        startIcon={match.version ? <RefreshIcon /> : <DataObjectIcon />}
      >
        <Link to={`/request#${match.match_id}`}>
          {match.version
            ? strings.match_button_reparse
            : strings.match_button_parse}
        </Link>
      </Button>
      {match.replay_url && (
        <Button
          startIcon={<DownloadIcon />}
          href={match.replay_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {strings.match_button_replay}
        </Button>
      )}
      {/* {config.VITE_ENABLE_DOTA_COACH && (
        <Button
          label={strings.app_dota_coach_button}
          icon={
            <img
              src="/assets/images/dota-coach-icon.png"
              alt="Sponsor icon dota-coach.com"
              height="24px"
            />
          }
          href="https://dota-coach.com?s=OpenDota&c=analytics"
          target="_blank"
          rel="noopener noreferrer"
        />
      )}
      {config.VITE_ENABLE_RIVALRY && (
        <Button
          label={strings.app_rivalry}
          icon={
            <img
              src="/assets/images/rivalry-icon.png"
              alt="Sponsor icon rivalry.com"
              height="24px"
            />
          }
          href="https://www.rivalry.com/opendota"
          target="_blank"
          rel="noopener noreferrer"
        />
      )} */}
    </div>
  );
};

export default MatchActions;
