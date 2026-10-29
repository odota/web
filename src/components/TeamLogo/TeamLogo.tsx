/**
 * @file TeamLogo.tsx
 * @description Displays team logos with cached team-detail lookups and a generic icon fallback.
 * @remarks Team details are requested only when the supplied logo is missing or fails to load.
 */

import React, { useEffect, useState } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import config from "../../config";
import { getTeamLogoUrl } from "../../utility";

// Reuse the detail lookup when a team appears in several series on the page.
const logoRequests = new Map<number, Promise<string>>();

/**
 * Looks up a team-detail logo, sharing cached requests for the same team.
 * @param teamId OpenDota team ID.
 * @returns A promise resolving to a logo URL, or an empty string when unavailable.
 * @example
 * const url = await getLogo(8965331);
 * // Resolves to the team detail logo URL, or "" if unavailable.
 */
const getLogo = (teamId: number) => {
  let request = logoRequests.get(teamId);
  if (!request) {
    request = fetch(`${config.VITE_API_HOST}/api/teams/${teamId}`, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json();
      })
      .then((team) => getTeamLogoUrl(team.logo_url || ""))
      .catch(() => {
        logoRequests.delete(teamId);
        return "";
      });
    logoRequests.set(teamId, request);
  }
  return request;
};

/**
 * Team logo sources and presentation options.
 * @example
 * const props: TeamLogoProps = { teamId: 8965331, style: { width: 32, height: 32 } };
 */
export type TeamLogoProps = {
  /** Optional team ID used for fallback artwork lookup. */
  teamId?: number | null;
  /** Optional logo URL from the team list; defaults to an empty string. */
  src?: string;
  /** Inline image and fallback-icon layout styles. */
  style?: React.CSSProperties;
};

/**
 * Displays a supplied logo, falls back to team details, then to a generic team icon.
 * @param props Logo identity and presentation options.
 * @param props.teamId Optional team ID for the fallback detail request.
 * @param props.src Optional logo URL from the team list.
 * @param props.style Inline size and layout styles applied to the image or fallback icon.
 * @returns A decorative logo image or team icon.
 * @example
 * <TeamLogo teamId={8965331} style={{ width: 32, height: 32 }} />
 * // Looks up the logo when src is omitted; shows a generic icon if unavailable.
 */
const TeamLogo = ({
  teamId,
  src = "",
  style,
}: TeamLogoProps) => {
  const [detail, setDetail] = useState({ teamId, src: "" });
  const [failedSrc, setFailedSrc] = useState("");
  const listSrc = getTeamLogoUrl(src);
  const needsDetail = !listSrc || failedSrc === listSrc;
  const logo = needsDetail ? (detail.teamId === teamId ? detail.src : "") : listSrc;

  useEffect(() => {
    if (!teamId || !needsDetail) return;
    let active = true;
    getLogo(teamId).then((url) => {
      if (active) setDetail({ teamId, src: url });
    });
    return () => { active = false; };
  }, [teamId, needsDetail]);

  return logo && logo !== failedSrc ? (
    <img
      src={logo}
      alt=""
      loading="lazy"
      onError={() => setFailedSrc(logo)}
      style={style}
    />
  ) : <GroupsIcon aria-hidden="true" style={style} />;
};

export default TeamLogo;
