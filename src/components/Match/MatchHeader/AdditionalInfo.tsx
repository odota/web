import React from "react";
import { Button } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import useStrings from "../../../hooks/useStrings.hook";
import styles from "./AdditionalInfo.module.css";

/**
 * Maps Dota region IDs to lowercase country codes for flag image filenames.
 * Regions without a mapping display their localized name without a flag.
 * @example
 * const country = regionCountries[5]; // "sg"
 * const flagSrc = `/assets/images/flags/${country}.svg`;
 */
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

type AdditionalInfoProps = {
  match: Match;
  onCopyMatchId: () => Promise<void>;
};

/**
 * Displays the optional league, copyable match ID, and localized region with its flag.
 * @param props Component props.
 * @param props.match Match supplying league, ID, and region metadata.
 * @param props.onCopyMatchId Callback that copies the match ID and handles feedback.
 * @returns Match metadata with a copy action and any available region flag.
 * @example
 * <AdditionalInfo match={match} onCopyMatchId={copyMatchId} />
 */
const AdditionalInfo = ({ match, onCopyMatchId }: AdditionalInfoProps) => {
  const strings = useStrings();

  return (
    <div className={styles.additionalInfo}>
      <ul>
        {match.league && (
          <li>
            <span className={styles.infoKey}>league</span>
            <span className={styles.infoValue}>{match.league.name}</span>
          </li>
        )}
        <li>
          <span className={styles.infoKey}>{strings.match_id}</span>
          <Button
            onClick={onCopyMatchId}
            startIcon={
              <ContentCopyIcon
                viewBox="0 -3 30 30"
                style={{ height: 18, width: 18 }}
              />
            }
          >
            {match.match_id}
          </Button>
        </li>
        <li>
          <span className={styles.infoKey}>{strings.match_region}</span>
          <span className={`${styles.infoValue} ${styles.regionValue}`}>
            {regionCountries[match.region] && (
              <img
                src={`/assets/images/flags/${regionCountries[match.region]}.svg`}
                alt=""
              />
            )}
            {strings[`region_${match.region}` as keyof Strings] || "-"}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default AdditionalInfo;
