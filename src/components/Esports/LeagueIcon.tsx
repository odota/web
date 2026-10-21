/**
 * @file LeagueIcon.tsx
 * @description Displays available league artwork with Unicode-aware initials when artwork is missing or fails to load.
 */

import React, { useState } from "react";
import styled from "styled-components";
import constants from "../constants";

/**
 * Frames league artwork or initials in a fixed-size decorative badge.
 * @example
 * <Icon>TI2</Icon>
 */
const Icon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  overflow: hidden;
  border: 1px solid rgba(100, 160, 210, 0.25);
  border-radius: 4px;
  background: rgba(100, 160, 210, 0.12);
  color: ${constants.colorBlue};
  font-family: ${constants.fontFamilyFuturistic};
  font-size: ${constants.fontSizeSmall};
  font-weight: 600;
  img { width: 100%; height: 100%; object-fit: contain; }
`;

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
    <Icon aria-hidden="true" title={name}>
      {image && image !== failedImage
        ? <img src={image} alt="" loading="lazy" onError={() => setFailedImage(image)} />
        : initials}
    </Icon>
  );
}
