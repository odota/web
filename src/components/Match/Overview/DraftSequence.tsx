import React from "react";
import { heroes } from "dotaconstants";
import config from "../../../config";
import useStrings from "../../../hooks/useStrings.hook";
import Heading from "../../Heading/Heading";
import { IconRadiant, IconDire } from "../../Icons";
import styles from "./DraftSequence.module.css";

type DraftEntry = { hero_id: keyof Heroes; is_pick: boolean; team: number; order: number };

/** Team draft boards retain the global sequence numbers across picks and bans. */
const DraftSequence = ({ match }: { match: Match }) => {
  const strings = useStrings();
  const entries = (match.picks_bans ?? []).slice().sort((a: DraftEntry, b: DraftEntry) => a.order - b.order) as DraftEntry[];
  if (!entries.length) return null;

  return (
    <section className={styles.draftSequence} aria-label="Picks and bans sequence">
      <Heading title="Picks & Bans Sequence" />
      <div className={styles.draftTeams}>
        {[0, 1].map((team) => {
          const radiant = team === 0;
          const teamName = (radiant ? match.radiant_team?.name : match.dire_team?.name)?.trim() || (radiant ? strings.general_radiant : strings.general_dire);
          return (
            <div className={styles.draftTeam} key={team} style={{ "--team-color": radiant ? "var(--od-color-green)" : "var(--od-color-red)" } as React.CSSProperties}>
              <h3>{radiant ? <IconRadiant width="20" height="20" /> : <IconDire width="20" height="20" />}{teamName}</h3>
              {[true, false].map((isPick) => (
                <React.Fragment key={String(isPick)}>
                  <h4>{isPick ? strings.match_pick : strings.match_ban}</h4>
                  <ol className={isPick ? undefined : styles.bans} aria-label={`${teamName} ${isPick ? strings.match_pick : strings.match_ban}`}>
                    {entries.filter((entry) => entry.team === team && entry.is_pick === isPick).map((entry) => {
                      const hero = heroes[entry.hero_id];
                      const label = `${entry.order + 1}. ${isPick ? strings.match_pick : strings.match_ban}: ${hero?.localized_name ?? strings.general_no_hero}`;
                      return <li key={entry.order} value={entry.order + 1} title={label} aria-label={label}>
                        {hero && <img src={config.VITE_IMAGE_CDN + hero.img} alt={hero.localized_name} loading="lazy" />}
                        <span className={styles.draftOrder}>{entry.order + 1}</span>
                      </li>;
                    })}
                  </ol>
                </React.Fragment>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DraftSequence;
