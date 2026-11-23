import React from "react";
import { Button } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import useStrings from "../../../hooks/useStrings.hook";
import styles from "./MatchHeader.module.css";

/** Maps Dota region IDs to the country codes used in flag asset filenames. */
const regionCountries: Record<number, string> = {
  1: "us",
  2: "us",
  3: "lu",
  5: "sg",
  6: "ae",
  7: "au",
  8: "se",
  9: "at",
  10: "br",
  11: "za",
  12: "cn",
  13: "cn",
  14: "cl",
  15: "pe",
  16: "in",
  17: "cn",
  18: "cn",
  19: "jp",
  20: "cn",
  25: "cn",
  37: "tw",
  38: "ar",
};

/**
 * Displays the name of the match's league.
 * @param props Component props.
 * @param props.name The league name.
 */
const MatchLeague = ({ name }: { name: string }) => (
  <li>
    <span className={styles.infoKey}>league</span>
    <span className={styles.infoValue}>{name}</span>
  </li>
);

/**
 * Displays the match ID and copies it to the clipboard on click.
 * @param props Component props.
 * @param props.matchId The match ID to display and copy.
 */
const MatchId = ({ matchId }: { matchId: Match["match_id"] }) => {
  const strings = useStrings();

  /** Copies the match ID as plain text to the clipboard. */
  const copyMatchId = () => navigator.clipboard.writeText(String(matchId));

  return (
    <li>
      <span className={styles.infoKey}>{strings.match_id}</span>
      <Button
        onClick={copyMatchId}
        startIcon={
          <ContentCopyIcon
            viewBox="0 -3 30 30"
            style={{ height: 18, width: 18 }}
          />
        }
      >
        {matchId}
      </Button>
    </li>
  );
};

/**
 * Displays the localized region name and its flag when available.
 * @param props Component props.
 * @param props.region The Dota region ID.
 */
const MatchRegion = ({ region }: { region: Match["region"] }) => {
  const strings = useStrings();
  const regionCountry = regionCountries[region];

  return (
    <li>
      <span className={styles.infoKey}>{strings.match_region}</span>
      <span className={`${styles.infoValue} ${styles.regionValue}`}>
        {regionCountry && (
          <img
            src={`/assets/images/flags/${regionCountry}.svg`}
            alt=""
          />
        )}
        {strings[`region_${region}` as keyof Strings] || "-"}
      </span>
    </li>
  );
};

/**
 * Displays the league, copyable match ID, and localized region with its flag when available.
 * @param props Component props.
 * @param props.match The match that supplies the metadata.
 * @returns The match metadata list.
 */
const MatchMetadata = ({ match }: { match: Match }) => {
  return (
    <div className={styles.additionalInfo}>
      <ul>
        {match.league && <MatchLeague name={match.league.name} />}
        <MatchId matchId={match.match_id} />
        <MatchRegion region={match.region} />
      </ul>
    </div>
  );
};

export default MatchMetadata;
