import React from "react";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import { Tooltip } from "../ui";
import { heroes } from "dotaconstants";
import {
  formatSeconds,
  getHeroesById,
  formatTemplateToString,
} from "../../utility";
import FormField from "../Form/FormField";
import { StyledLogFilterForm } from "./StyledMatch";
import HeroImage from "../Visualizations/HeroImage";
import config from "../../config";
import sword from "../Icons/Sword.svg";
import { IconBloodDrop, IconRoshan } from "../Icons";
import lightning from "../Icons/Lightning.svg";
import styles from "./MatchLog.module.css";

const DIVIDER_SECONDS = 30; // insert a divider if two consecutive entries are X seconds apart

const isRadiant = (entry: any) => {
  if (entry.isRadiant) {
    return true;
  }
  if (entry.alt_key === "CHAT_MESSAGE_COURIER_LOST") {
    return entry.team !== 2;
  }
  return (
    (entry.unit && entry.unit.indexOf("goodguys") !== -1) || entry.team === 2
  );
};

const heroNames = getHeroesById();
const typeConfig = {
  kills: 0,
  objectives: 1,
  runes: 2,
};
const getObjectiveDesc = (objective: any, strings: Strings) =>
  objective.key && objective.type === "CHAT_MESSAGE_BARRACKS_KILL"
    ? strings[`barracks_value_${objective.key}` as keyof Strings]
    : "";
const getObjectiveBase = (objective: any, strings: Strings) => {
  if (objective.type === "building_kill") {
    const desc =
      objective.key.indexOf("npc_dota_badguys") === 0
        ? strings.general_dire
        : strings.general_radiant;
    return `${desc} ${(objective.key.split("guys_") || [])[1]}`;
  }
  return (
    strings[(objective.subtype || objective.type) as keyof Strings] ||
    objective.subtype ||
    objective.type
  );
};
const generateLog = (
  match: Match,
  { types, players }: { types: number[]; players: number[] },
  strings: Strings,
) => {
  let log: any[] = [];
  const matchPlayers = !players.length
    ? match.players
    : match.players.filter((p, i) => players.includes(i));

  if (types.includes(typeConfig.objectives)) {
    log = (match.objectives || []).reduce((objectivesLog, objective) => {
      if (!players.length || players.includes(objective.slot)) {
        /*
        let name;
        if (objective.slot === -1) {
          if (objective.team === 2) {
            name = strings.general_radiant;
          } else if (objective.team === 3) {
            name = strings.general_dire;
          }
        }
        */
        if (objective.type === "CHAT_MESSAGE_COURIER_LOST") {
          // Adjust for incorrect data from post 7.23 core bug
          // Here the team value is killer id
          if (objective.killer === undefined) {
            const team = objective.team > 4 ? 2 : 3;
            objective.killer = (team === 2 ? 123 : 0) + objective.team;
            objective.team = team;
          }
          const killer =
            match.players.find(
              (player) => player.player_slot === objective.killer,
            )?.hero_id || -1;
          if (killer !== -1) {
            objective.hero_id = killer;
          }
        }
        objectivesLog.push({
          ...objective,
          ...matchPlayers[objective.slot],
          type: "objectives",
          alt_key: objective.type,
          detail: `${getObjectiveDesc(objective, strings)} ${getObjectiveBase(
            objective,
            strings,
          )}`,
        });
      }
      return objectivesLog;
    }, log);
  }

  matchPlayers.forEach((player) => {
    if (types.includes(typeConfig.kills)) {
      log = log.concat(
        (player.kills_log || []).map((entry) => ({
          ...entry,
          ...player,
          type: "kills",
          detail: `${entry.key}`,
        })),
      );
    }

    if (types.includes(typeConfig.runes)) {
      log = log.concat(
        (player.runes_log || []).map((entry) => ({
          ...entry,
          ...player,
          type: "runes",
          detail: `${entry.key}`,
        })),
      );
    }
    /*
    log = log.concat((player.obs_log || []).map(entry => ({
      ...entry,
      ...player,
      type: 'obs_ward',
      detail: `${entry.key}`,
    })));
    */
  });
  log = log.sort((a, b) => a.time - b.time);
  return log;
};

type MatchLogProps = {
  match: Match;
  strings: Strings;
};

type MatchLogState = { types: number[]; players: number[] } & Record<
  string,
  any
>;

class MatchLog extends React.Component<MatchLogProps, MatchLogState> {
  typesSource: { label: string; id: number }[] = [];
  playersSource: { label: string; id: number }[] = [];
  constructor(props: MatchLogProps) {
    super(props);
    this.state = {
      types: Object.values(typeConfig),
      players: [],
    };

    const { strings } = props;
    this.typesSource = [
      { label: strings.heading_kills, id: 0 },
      { label: strings.tab_objectives, id: 1 },
      { label: strings.heading_runes, id: 2 },
    ];
    this.playersSource = this.props.match.players.map((player, index) => ({
      label: heroes[player.hero_id]
        ? heroes[player.hero_id].localized_name
        : strings.general_no_hero,
      id: index,
    }));
  }

  addChip = (
    name: string,
    input: { label: string; id: number },
    limit?: number,
  ) => {
    const currentChips = this.state[name as "types" | "players"];
    if (!currentChips.includes(input.id)) {
      const newChips = [input.id].concat(currentChips).slice(0, limit);
      this.setState({ [name]: newChips });
    }
  };

  deleteChip = (name: string, index: number) => {
    const currentChips = this.state[name as "types" | "players"];
    const newChips = [
      ...currentChips.slice(0, index),
      ...currentChips.slice(index + 1),
    ];
    this.setState({ [name]: newChips });
  };

  render() {
    const { strings } = this.props;
    const runeTooltips = Object.keys(strings)
      .filter((str) => str.indexOf("rune_") === 0)
      .map((runeKey) => {
        const runeString = strings[runeKey as keyof Strings];
        return (
          <ReactTooltip id={runeString} key={runeString}>
            <span>{runeString}</span>
          </ReactTooltip>
        );
      });
    const logData = generateLog(this.props.match, this.state, strings);
    const groupedEntries: any[] = [];
    let lastEntryTime = Number.MIN_SAFE_INTEGER;

    return (
      <div>
        {runeTooltips}
        <StyledLogFilterForm>
          <div className="title">{strings.filter_button_text_open}</div>
          <FormField
            name="types"
            label={strings.ward_log_type}
            dataSource={this.typesSource}
            addChip={this.addChip}
            deleteChip={this.deleteChip}
            formSelectionState={this.state}
            strict
            width={400}
          />
          <FormField
            name="players"
            label={strings.log_heroes}
            dataSource={this.playersSource}
            addChip={this.addChip}
            deleteChip={this.deleteChip}
            formSelectionState={this.state}
            strict
            width={400}
          />
        </StyledLogFilterForm>
        <div className={styles.styledLogContainer}>
          {logData.map((entry, index) => {
            groupedEntries.push(entry);
            const nextEntry = logData[index + 1];

            if (
              index === logData.length - 1 ||
              nextEntry.player_slot !== entry.player_slot || //  group consecutive log entries by the same player together
              nextEntry.time - entry.time > DIVIDER_SECONDS // unless they're more than DIVIDER_SECONDS seconds apart
            ) {
              const renderEntries = [...groupedEntries];
              groupedEntries.length = 0;

              let renderFirst;
              if (entry.hero_id === undefined) {
                renderFirst = (
                  <img
                    src={`/assets/images/${
                      isRadiant(renderEntries[0]) ? "radiant" : "dire"
                    }.png`}
                    alt=""
                    className={styles.heroImage}
                  />
                );
              } else {
                renderFirst = (
                  <HeroImage
                    id={entry.hero_id}
                    className={styles.heroImage}
                  />
                );
              }

              let timeDivider = null;
              if (renderEntries[0].time - lastEntryTime >= DIVIDER_SECONDS) {
                timeDivider = (
                  <div className={styles.timeDivider}>
                    <div />
                    <span>{formatSeconds(renderEntries[0].time)}</span>
                    <div />
                  </div>
                );
              }

              let renderSecond = (
                <div
                  className={`${styles.entryMessagesContainer} ${
                    isRadiant(renderEntries[0]) ? styles.radiant : styles.dire
                  }`}
                >
                  {renderEntries.map((e) => {
                    lastEntryTime = e.time;
                    if (isRadiant(renderEntries[0])) {
                      return (
                        <div className={styles.entryMessage}>
                          <EntryMessage entry={e} strings={strings} />
                          <span
                            className={styles.time}
                            style={{ marginLeft: 15 }}
                          >
                            {formatSeconds(e.time)}
                          </span>
                        </div>
                      );
                    }
                    return (
                      <div className={styles.entryMessage}>
                        <span
                          className={styles.time}
                          style={{ marginRight: 15 }}
                        >
                          {formatSeconds(e.time)}
                        </span>
                        <EntryMessage entry={e} strings={strings} />
                      </div>
                    );
                  })}
                </div>
              );

              if (!isRadiant(renderEntries[0])) {
                const temp = renderFirst;
                renderFirst = renderSecond;
                renderSecond = temp;
              }

              return (
                <>
                  {timeDivider}
                  <div
                    className={styles.entry}
                    style={{
                      justifyContent: isRadiant(renderEntries[0])
                        ? "flex-start"
                        : "flex-end",
                    }}
                  >
                    {renderFirst}
                    <div style={{ width: 16 }} />
                    {renderSecond}
                  </div>
                </>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }
}

function EntryMessage({ entry, strings }: { entry: any; strings: Strings }) {
  const translateBuildings = (isRad: boolean, key: string) => {
    const team = isRad ? strings.general_radiant : strings.general_dire;
    const k = key.split("_").slice(3).join("_");
    const dict = {
      fort: ` ${strings.building_ancient}`,
      healers: ` ${strings.heading_shrine}`,
      tower1_top: ` ${strings.top_tower} ${strings.tier1}`,
      tower2_top: ` ${strings.top_tower} ${strings.tier2}`,
      tower3_top: ` ${strings.top_tower} ${strings.tier3}`,
      towerenderSecond_top: ` ${strings.top_tower}`,
      tower1_mid: ` ${strings.mid_tower} ${strings.tier1}`,
      tower2_mid: ` ${strings.mid_tower} ${strings.tier2}`,
      tower3_mid: ` ${strings.mid_tower} ${strings.tier3}`,
      towerenderSecond_mid: ` ${strings.mid_tower}`,
      tower1_bot: ` ${strings.bot_tower} ${strings.tier1}`,
      tower2_bot: ` ${strings.bot_tower} ${strings.tier2}`,
      tower3_bot: ` ${strings.bot_tower} ${strings.tier3}`,
      towerenderSecond_bot: ` ${strings.bot_tower}`,
      tower4: ` ${strings.heading_tower} ${strings.tier4}`,
      melee_rax_top: ` ${"Top"} ${strings.building_melee_rax}`,
      melee_rax_mid: ` ${"Mid"} ${strings.building_melee_rax}`,
      melee_rax_bot: ` ${"Bot"} ${strings.building_melee_rax}`,
      range_rax_top: ` ${"Top"} ${strings.building_range_rax}`,
      range_rax_mid: ` ${"Mid"} ${strings.building_range_rax}`,
      range_rax_bot: ` ${"Bot"} ${strings.building_range_rax}`,
    };
    return team + dict[k as keyof typeof dict];
  };

  switch (entry.type) {
    case "kills": {
      const hero = heroNames[entry.detail] || {};
      return (
        <>
          <img src={sword} className={`swordIcon ${styles.icon}`} />
          <span className={styles.smallMutedText}>{strings.killed}</span>
          <HeroImage id={hero.id} className={styles.detailIcon} isIcon />
          <span className={styles.smallBoldText}>{hero.localized_name}</span>
          {entry.smoke && (
            <Tooltip title={strings.smoke_kill}>
              <img
                src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/dota_react/items/smoke_of_deceit.png`}
                alt={strings.smoke_kill}
                className={styles.detailIcon}
              />
            </Tooltip>
          )}
        </>
      );
    }
    case "runes": {
      const runeType = entry.detail;
      const runeString = strings[`rune_${runeType}` as keyof Strings];
      return (
        <>
          <Tooltip title={runeString}>
            <img
              src={`/assets/images/dota2/runes/${runeType}.png`}
              alt={`${runeString} rune`}
              className={styles.detailIcon}
            />
          </Tooltip>
          <span
            className={styles.smallMutedText}
            style={{ textTransform: "lowercase" }}
          >
            {strings.activated}&nbsp;
          </span>
          <span className={styles.smallBoldText}>
            {runeString} {strings.rune}
          </span>
        </>
      );
    }
    case "objectives":
      if (entry.alt_key === "CHAT_MESSAGE_FIRSTBLOOD") {
        return (
          <>
            <IconBloodDrop className={`${styles.dropIcon} ${styles.icon}`} />
            <span className={styles.smallBoldText}>
              {strings.drew_first_blood}
            </span>
          </>
        );
      }
      if (entry.alt_key === "building_kill") {
        return (
          <>
            {/* #e5cf11 */}
            <img
              src={lightning}
              className={styles.icon}
              style={{
                filter:
                  "invert(87%) sepia(98%) saturate(4073%) hue-rotate(341deg) brightness(90%) contrast(100%)",
              }}
            />
            <span className={styles.smallMutedText}>
              {strings.destroyed}&nbsp;
            </span>
            <span className={styles.smallBoldText}>
              {translateBuildings(
                entry.key.indexOf("goodguys") !== -1,
                entry.key,
              )}{" "}
              {(isRadiant(entry) && entry.key.indexOf("goodguys") !== -1) ||
              (!isRadiant(entry) && entry.key.indexOf("badguys") !== -1)
                ? `(${strings.building_denied})`
                : ""}
            </span>
          </>
        );
      }
      if (entry.alt_key === "CHAT_MESSAGE_AEGIS") {
        return (
          <>
            <img
              src="/assets/images/dota2/aegis_icon.png"
              alt="Aegis of Immortality"
              className={styles.detailIcon}
            />
            <span className={styles.smallBoldText}>
              {strings.CHAT_MESSAGE_AEGIS}
            </span>
          </>
        );
      }
      if (entry.alt_key === "CHAT_MESSAGE_AEGIS_STOLEN") {
        return (
          <>
            <img
              src="/assets/images/dota2/aegis_icon.png"
              alt="Aegis of Immortality"
              className={styles.detailIcon}
            />
            <span className={styles.smallBoldText}>
              {strings.CHAT_MESSAGE_AEGIS_STOLEN}
            </span>
          </>
        );
      }
      if (entry.alt_key === "CHAT_MESSAGE_ROSHAN_KILL") {
        return (
          <>
            <IconRoshan className={`${styles.roshanIcon} ${styles.icon}`} />
            <span className={styles.smallBoldText}>{strings.slain_roshan}</span>
          </>
        );
      }
      if (entry.alt_key === "CHAT_MESSAGE_MINIBOSS_KILL") {
        return (
          <>
            <img
              src="/assets/images/dota2/shard_1.png"
              alt="Aghanim's Shard"
              className={styles.detailIcon}
            />
            <span className={styles.smallBoldText}>
              {strings.destroyed_tormentor}
            </span>
          </>
        );
      }
      if (entry.alt_key === "CHAT_MESSAGE_COURIER_LOST") {
        const team =
          entry.team === 2 ? strings.general_radiant : strings.general_dire;
        return (
          <>
            <img src={sword} className={`swordIcon ${styles.icon}`} />
            <span className={styles.smallMutedText}>{strings.killed}</span>
            <img
              src={`/assets/images/dota2/${
                entry.team === 2 ? "radiant" : "dire"
              }courier.png`}
              alt="Courier"
              className={styles.detailIcon}
            />
            <span className={styles.smallBoldText}>
              {formatTemplateToString(strings.team_courier, {
                team,
              })}
            </span>
          </>
        );
      }
      return null;
    default:
      return null;
  }
}

const mapStateToProps = (state: any) => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(MatchLog);
