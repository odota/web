import React from "react";
import { formatTemplateToString } from "../../../../utility";
import useStrings from "../../../../hooks/useStrings.hook";
import styles from "./Card.module.css";

const fastPlurality = (val: number, singular: string, plural: string) =>
  val === 1 ? singular : plural;

const formatDurationString = (sec: number, strings: Strings) => {
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec - days * 86400) / 3600);
  const minutes = Math.floor((sec - days * 86400 - hours * 3600) / 60);
  const seconds = Math.floor(sec - days * 86400 - hours * 3600 - minutes * 60);
  return [
    formatTemplateToString(
      fastPlurality(days, strings.time_abbr_d, strings.time_abbr_dd),
      days,
    ),
    formatTemplateToString(
      fastPlurality(hours, strings.time_abbr_h, strings.time_abbr_hh),
      hours,
    ),
    formatTemplateToString(
      fastPlurality(minutes, strings.time_abbr_m, strings.time_abbr_mm),
      minutes,
    ),
    formatTemplateToString(
      fastPlurality(seconds, strings.time_abbr_s, strings.time_abbr_ss),
      seconds,
    ),
  ].join(" ");
};

const Card = ({ total }: { total: { field: string; sum: number } }) => {
  const strings = useStrings();
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <div className={styles.header}>
          {strings[`heading_${total.field}` as keyof Strings]}
        </div>
        <div className={styles.value}>
          {total.field === "duration"
            ? formatDurationString(total.sum, strings)
            : Math.floor(total.sum).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default Card;
