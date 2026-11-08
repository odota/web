import React from "react";
import styled from "styled-components";
import { heroes } from "dotaconstants";
import config from "../../../config";
import useStrings from "../../../hooks/useStrings.hook";
import Heading from "../../Heading/Heading";
import { IconRadiant, IconDire } from "../../Icons";
import constants from "../../constants";

const Styled = styled.section`
  margin: 24px 0;

  .draft-teams { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; margin-top: 16px; }
  .draft-team { min-width: 0; padding: 16px; background: rgba(128, 128, 128, 0.06); border-top: 2px solid var(--team-color); }
  h3 { display: flex; align-items: center; gap: 8px; margin: 0 0 16px; font-size: 16px; }
  h4 { margin: 12px 0 6px; color: ${constants.textColorSecondary}; font-size: 11px; text-transform: uppercase; }
  ol { display: flex; gap: 6px; padding: 0; margin: 0; list-style: none; }
  .draft-team ol { flex-wrap: wrap; }
  li { position: relative; flex: 0 0 72px; min-width: 0; overflow: hidden; border: 1px solid var(--team-color); border-radius: 3px; background: #111; }
  img { display: block; width: 100%; aspect-ratio: 1.3; object-fit: cover; }
  .draft-order { position: absolute; top: 0; left: 0; padding: 1px 5px; background: rgba(0, 0, 0, 0.8); color: #fff; font-size: 11px; font-weight: 600; font-variant-numeric: tabular-nums; }
  .bans li { border-color: rgba(128, 128, 128, 0.3); }
  .bans img { aspect-ratio: 1.3; filter: grayscale(1); opacity: 0.65; }
  .bans li::after { content: ""; position: absolute; inset: 50% -15%; border-top: 2px solid ${constants.colorRed}; transform: rotate(-30deg); pointer-events: none; }
  @media (max-width: 850px) { .draft-teams { grid-template-columns: 1fr; gap: 16px; } }
`;

type DraftEntry = { hero_id: keyof Heroes; is_pick: boolean; team: number; order: number };

/** Team draft boards retain the global sequence numbers across picks and bans. */
const DraftSequence = ({ match }: { match: Match }) => {
  const strings = useStrings();
  const entries = (match.picks_bans ?? []).slice().sort((a: DraftEntry, b: DraftEntry) => a.order - b.order) as DraftEntry[];
  if (!entries.length) return null;

  return (
    <Styled aria-label="Picks and bans sequence">
      <Heading title="Picks & Bans Sequence" />
      <div className="draft-teams">
        {[0, 1].map((team) => {
          const radiant = team === 0;
          const teamName = (radiant ? match.radiant_team?.name : match.dire_team?.name)?.trim() || (radiant ? strings.general_radiant : strings.general_dire);
          return (
            <div className="draft-team" key={team} style={{ "--team-color": radiant ? constants.colorGreen : constants.colorRed } as React.CSSProperties}>
              <h3>{radiant ? <IconRadiant width="20" height="20" /> : <IconDire width="20" height="20" />}{teamName}</h3>
              {[true, false].map((isPick) => (
                <React.Fragment key={String(isPick)}>
                  <h4>{isPick ? strings.match_pick : strings.match_ban}</h4>
                  <ol className={isPick ? "picks" : "bans"} aria-label={`${teamName} ${isPick ? strings.match_pick : strings.match_ban}`}>
                    {entries.filter((entry) => entry.team === team && entry.is_pick === isPick).map((entry) => {
                      const hero = heroes[entry.hero_id];
                      const label = `${entry.order + 1}. ${isPick ? strings.match_pick : strings.match_ban}: ${hero?.localized_name ?? strings.general_no_hero}`;
                      return <li key={entry.order} value={entry.order + 1} title={label} aria-label={label}>
                        {hero && <img src={config.VITE_IMAGE_CDN + hero.img} alt={hero.localized_name} loading="lazy" />}
                        <span className="draft-order">{entry.order + 1}</span>
                      </li>;
                    })}
                  </ol>
                </React.Fragment>
              ))}
            </div>
          );
        })}
      </div>
    </Styled>
  );
};

export default DraftSequence;
