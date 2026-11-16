import React from "react";
import ReactTooltip from "react-tooltip";
import { heroes } from "dotaconstants";
import { formatSeconds, isRadiant, jsonFn, getTeamName } from "../../utility";
import { IconRoshan, IconBattle } from "../Icons";
import PlayerThumb from "./PlayerThumb/PlayerThumb";
import constants from "../constants";
import config from "../../config";
import useStrings from "../../hooks/useStrings.hook";
import styles from "./Timeline.module.css";

/**
 * Draws the skull marker used for first blood on the match timeline.
 * @param props SVG attributes, including tooltip identifiers and the marker class.
 * @returns A decorative SVG; its containing event supplies tooltip content.
 */
const FirstBloodIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2a9 9 0 0 0-9 9c0 3.1 1.5 5.7 4 7.3V22h10v-3.7c2.5-1.6 4-4.2 4-7.3a9 9 0 0 0-9-9Z" />
    <circle cx="8.5" cy="10.5" r="2" fill="#111827" />
    <circle cx="15.5" cy="10.5" r="2" fill="#111827" />
    <path d="m12 13-2 3h4Z M10 19v3m4-3v3" fill="#111827" stroke="#111827" strokeWidth="1.5" />
  </svg>
);


const heroesArr = jsonFn(heroes);

const getWinnerStyle = (obj: any) =>
  obj && obj.radiant_gold_advantage_delta >= 0
    ? styles.radiantWinner
    : styles.direWinner;

const Timeline = ({
  match,
  onTeamfightClick,
  onTeamfightHover,
  selectedTeamfight,
}: {
  match: Match;
  onTeamfightClick?: Function;
  onTeamfightHover?: Function;
  selectedTeamfight?: number;
}) => {
  const strings = useStrings();
  const preHorn = 90; // Seconds before the battle horn

  if (match.objectives && match.objectives.length > 0) {
    // Firstblood
    const fbIndex = match.objectives.findIndex(
      (obj) => obj.type === "CHAT_MESSAGE_FIRSTBLOOD",
    );
    let fbArr: {
      type: string;
      time: number;
      team?: number;
      player_slot?: number;
      victim_player_slot?: number;
      key?: number | null;
      start?: number;
      end?: number;
      deaths?: any[];
    }[] = [{ type: "firstblood", time: match.first_blood_time || 0 }];

    if (fbIndex > -1 && match.objectives[fbIndex].player_slot !== undefined) {
      const killer = match.players.find(
        (player) =>
          player.player_slot === match.objectives[fbIndex].player_slot,
      );
      const killerLog = killer?.kills_log;

      fbArr = [
        {
          type: "firstblood",
          time: match.objectives[fbIndex].time,
          player_slot: match.objectives[fbIndex].player_slot,
          victim_player_slot: match.objectives[fbIndex].victim_player_slot,
          key: killerLog && killerLog[0] ? killerLog[0].key : null,
        },
      ];
    }

    // The victim from the objective when the API provides it; otherwise fall
    // back to guessing from the killer's first kills_log entry, which misses
    // first bloods not credited to a hero (e.g. a creep landing the blow)
    const findFbVictim = (obj: (typeof fbArr)[number]) => {
      if (obj.victim_player_slot !== undefined) {
        return match.players.find(
          (player) => player.player_slot === obj.victim_player_slot,
        );
      }
      if (obj.key) {
        return match.players.find((player) => {
          const foundHero = heroesArr("find")(
            (hero: any) => hero.name === obj.key,
          );
          return foundHero && player.hero_id === foundHero.id;
        });
      }
      return undefined;
    };

    const events = fbArr

      // Roshan kills, team 2 = radiant, 3 = dire
      .concat(
        match.objectives
          .filter((obj) => obj.type === "CHAT_MESSAGE_ROSHAN_KILL")
          .map((obj, i) => ({
            type: "roshan",
            time: obj.time,
            team: obj.team,
            key: i,
          })) || [],
      )

      // Teamfights
      .concat(
        match.teamfights && match.teamfights.length > 0
          ? match.teamfights.map((fight) => ({
              type: "teamfight",
              start: fight.start,
              end: fight.end,
              time: (fight.start + fight.end) / 2,
              radiant_gold_advantage_delta: fight.radiant_gold_advantage_delta,
              deaths: fight.players
                .map((player, i) => ({
                  key: i,
                  gold_delta: player.gold_delta,
                  deaths: player.deaths,
                }))
                .filter(String),
            }))
          : [],
      );

    // Aegis pickups
    const aegis = (match.objectives || [])
      .filter(
        (obj) =>
          obj.type === "CHAT_MESSAGE_AEGIS" ||
          obj.type === "CHAT_MESSAGE_AEGIS_STOLEN" ||
          obj.type === "CHAT_MESSAGE_DENIED_AEGIS",
      )
      .map((obj) => ({
        type: "aegis",
        act: ((obj.type === "CHAT_MESSAGE_AEGIS_STOLEN" && "stolen") ||
          (obj.type === "CHAT_MESSAGE_DENIED_AEGIS" && "denied")) as string,
        time: obj.time,
        player_slot: obj.player_slot,
      }));

    let fTower = match.objectives.findIndex(
      (o) =>
        o.type === "CHAT_MESSAGE_TOWER_KILL" ||
        o.type === "CHAT_MESSAGE_TOWER_DENY",
    );
    fTower = match.objectives[fTower] ? match.objectives[fTower].time : null;

    let fRax =
      match.objectives[
        match.objectives.findIndex(
          (o) => o.type === "CHAT_MESSAGE_BARRACKS_KILL",
        )
      ] || null;

    return Math.abs(
      events.filter((obj) => obj.type === "firstblood")[0].time -
        match.first_blood_time,
    ) <= preHorn ? (
      // some old (source1) matches have wrong time in objectives, ex: 271008789.
      // preHorn (90) is just small allowable mismatch. Since first_blood_time always >= 0, ex: 2792706825, fb before battle horn
      <div>
        <main className={styles.timeline}>
          <section>
            <mark>{getTeamName(match.radiant_team, true)}</mark>
            <time>-1:30</time>
            <mark>{getTeamName(match.dire_team, false)}</mark>
          </section>
          <div className={styles.battle}>
            <div className={styles.line}>
              <section style={{ width: "100%" }} />
            </div>
            <div className={styles.events}>
              <mark
                className={styles.battleHorn}
                style={{
                  left: `${(preHorn * 100) / (match.duration + preHorn)}%`,
                }}
              />
              {events.map((obj, i) => {
                const side =
                  (obj.player_slot && isRadiant(obj.player_slot)) ||
                  (obj.team && obj.team === 2)
                    ? "radiant"
                    : "dire";
                const wTeamfight: number =
                  obj.type === "teamfight"
                    ? //@ts-expect-error
                      (100 * (obj.end - obj.start)) / (match.duration + preHorn)
                    : 0;

                return (
                  <mark
                    key={`${obj.type}_${obj.time}`}
                    className={
                      obj.type === "teamfight" ? styles.teamfight : styles[side]
                    }
                    style={{
                      left:
                        obj.time &&
                        `${
                          (100 * (obj.time + preHorn)) /
                            (match.duration + preHorn) -
                          wTeamfight / 2
                        }%`,
                      width: `${wTeamfight}%`,
                      // backgroundColor: obj.type === 'teamfight' && (
                      //   obj.radiant_gold_advantage_delta >= 0 ? styles.green : styles.red
                      // ),
                    }}
                  >
                    {obj.type === "firstblood" && (
                      <FirstBloodIcon className="firstBloodIcon" data-tip data-for={`event_${i}`} />
                    )}
                    {obj.type === "roshan" && (
                      <IconRoshan data-tip data-for={`event_${i}`} />
                    )}
                    {obj.type === "teamfight" && (
                      <IconBattle
                        onClick={
                          onTeamfightClick && onTeamfightClick(obj.start)
                        }
                        onMouseEnter={
                          onTeamfightHover && onTeamfightHover(obj.start)
                        }
                        onMouseLeave={
                          onTeamfightHover && onTeamfightHover(null)
                        }
                        data-tip
                        data-for={`event_${i}`}
                        className={`${styles.iconBattle} ${selectedTeamfight === obj.start ? styles.selectedTeamfight : getWinnerStyle(obj)} ${selectedTeamfight || selectedTeamfight === 0 ? styles.clickable : ""}`}
                      />
                    )}
                    <ReactTooltip
                      className={obj.type === "firstblood" ? "firstBloodTooltip" : undefined}
                      // Hide tooltip if it's not in objectives
                      id={
                        obj.type === "firstblood" &&
                        !obj.key &&
                        !obj.player_slot
                          ? ""
                          : `event_${i}`
                      }
                      effect="solid"
                      place="right"
                    >
                      {obj.type === "firstblood" &&
                        (() => {
                          const victim = findFbVictim(obj);
                          return (
                            <div>
                              <header className="firstBloodHeading">
                                <FirstBloodIcon />
                                {strings.CHAT_MESSAGE_FIRSTBLOOD}
                                <span>{formatSeconds(obj.time)}</span>
                              </header>
                            <section className="firstBloodPlayers">
                              {match.players
                                .filter(
                                  (player) =>
                                    player.player_slot === obj.player_slot,
                                )
                                .map((player) => (
                                  <PlayerThumb
                                    key={player.player_slot}
                                    {...player}
                                  />
                                ))}
                              <span>
                                {victim
                                  ? strings.timeline_firstblood_key
                                  : strings.timeline_firstblood}
                              </span>
                              {victim && <PlayerThumb {...victim} />}
                            </section>
                            </div>
                          );
                        })()}
                      {obj.type === "roshan" &&
                        aegis[obj.key as number] &&
                        match.players
                          .filter(
                            (player) =>
                              player.player_slot ===
                              aegis[obj.key as number].player_slot,
                          )
                          .map((player) => (
                            <section key={player.player_slot}>
                              <PlayerThumb {...player} />
                              <span>
                                {!aegis[obj.key as number].act &&
                                  strings.timeline_aegis_picked_up}
                                {aegis[obj.key as number].act === "stolen" &&
                                  strings.timeline_aegis_snatched}
                                {aegis[obj.key as number].act === "denied" &&
                                  strings.timeline_aegis_denied}
                              </span>
                              <img
                                src="/assets/images/dota2/aegis_icon.png"
                                alt="Aegis of Immortality"
                              />
                            </section>
                          ))}
                      {obj.type === "teamfight" && (
                        <div>
                          <header>
                            {strings.timeline_teamfight_deaths}
                            <span className={styles.subtitle}>
                              & {strings.timeline_teamfight_gold_delta},{" "}
                              {formatSeconds(obj.start)} -{" "}
                              {formatSeconds(obj.end)}
                            </span>
                          </header>
                          {obj.deaths?.map((death) => (
                            <section key={death.key}>
                              <PlayerThumb {...match.players[death.key]} />
                              {death.deaths > 0 ? (
                                <img
                                  src="/assets/images/player_death.png"
                                  alt="Death icon"
                                />
                              ) : (
                                ""
                              )}
                              <span className={styles.goldDelta}>
                                {death.gold_delta > 0 ? (
                                  <span
                                    className={`${styles.goldChange} ${styles.goldGot}`}
                                  />
                                ) : (
                                  <span
                                    className={`${styles.goldChange} ${styles.goldLost}`}
                                  />
                                )}
                                {/* nothing if === 0 */}
                                {/*@ts-expect-error*/}
                                <font style={{ color: constants.colorGolden }}>
                                  {Math.abs(death.gold_delta)}{" "}
                                  {/*@ts-expect-error*/}
                                </font>
                                <img
                                  alt="Gold"
                                  src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/tooltips/gold.png`}
                                />
                              </span>
                            </section>
                          ))}
                        </div>
                      )}
                    </ReactTooltip>
                    <time>
                      {obj.type !== "teamfight" && formatSeconds(obj.time)}
                    </time>
                  </mark>
                );
              })}
            </div>
          </div>
          <time>{formatSeconds(match.duration)}</time>
        </main>
        <div className={styles.matchNumbers}>
          {fTower && (
            <div>
              <span>{strings.match_first_tower} </span>
              {formatSeconds(fTower)}
            </div>
          )}
          {fRax && (
            <div>
              <span>
                {strings.match_first_barracks} (
                {strings[`barracks_value_${fRax.key}` as keyof Strings]}){" "}
              </span>
              {formatSeconds(fRax.time)}
            </div>
          )}
        </div>
      </div>
    ) : null;
  }

  return null;
};

export default Timeline;
