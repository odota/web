/**
 * @file LeagueIcon.tsx
 * @description Displays available league artwork with Unicode-aware initials when artwork is missing or fails to load.
 */

import React, { useState } from "react";
import styles from "./LeagueIcon.module.css";

/**
 * Artwork sources and identity for a league icon.
 * @example
 * const props: LeagueIconProps = { name: "The International 2026", banner: null };
 */
export type LeagueIconProps = {
  /** League name used for the image title and fallback initials. */
  name: string;
  /** Optional public banner URL; null indicates no supplied artwork. */
  banner?: string | null;
  /** Optional public image URL used when no banner URL is supplied. */
  ticket?: string | null;
};

/**
 * Renders league artwork or initials when no usable image is available.
 * @param props League identity and optional artwork sources.
 * @param props.name League name used to derive fallback initials.
 * @param props.banner Optional public HTTP(S) banner URL.
 * @param props.ticket Optional public HTTP(S) ticket image URL, used if no banner URL exists.
 * @returns A fixed-size decorative league icon.
 * @example
 * <LeagueIcon name="The International 2026" />
 * // Displays TI2 when no image is available.
 */
export default function LeagueIcon({ name, banner, ticket }: LeagueIconProps) {
  const [failedImage, setFailedImage] = useState("");
  const image = [banner, ticket].find((value) => value && /^https?:\/\//.test(value)) || "";
  const words = name.match(/[\p{L}\p{N}]+/gu) || [];
  const initials = (words.length > 1
    ? words.slice(0, 3).map((word) => Array.from(word)[0]).join("")
    : Array.from(words[0] || "?").slice(0, 3).join("")).toUpperCase();
  return (
    <span className={styles.icon} aria-hidden="true" title={name}>
      {image && image !== failedImage
        ? <img src={image} alt="" loading="lazy" onError={() => setFailedImage(image)} />
        : initials}
    </span>
  );
}
