import React from "react";
import { player_colors as playerColors } from "dotaconstants";
import { heroes } from "dotaconstants";
import ReactTooltip from "react-tooltip";
import { pad, sum, isRadiant, patchDate } from "../../../utility";
import Heading from "../../Heading/Heading";
import DotaMap from "../../DotaMap/DotaMap";
import HeroImage from "../../Visualizations/HeroImage";
import buildingDataOld from "./buildingData";
import buildingData733 from "./buildingData733";
import constants from "../../constants";
import config from "../../../config";
import useStrings from "../../../hooks/useStrings.hook";
import { Spacer } from "../../Spacer/Spacer";
import styles from "./BuildingMap.module.css";

const buildingDataByPatch = [
  { patch: "7.33", data: buildingData733 },
  { patch: "6.70", data: buildingDataOld },
];

const getBuildingData = (startTime: number) => {
  if (!startTime) return buildingDataByPatch[0].data;

  const buildingData = buildingDataByPatch.find(
    (buildingData) => startTime >= patchDate[buildingData.patch],
  );

  return buildingData?.data || buildingDataByPatch[0].data;
};

const buildingsHealth = {
  tower1: 1300,
  tower2: 1600,
  tower3: 1600,
  tower4: 1600,
  melee_rax: 1500,
  range_rax: 1200,
  fort: 4200,
};

const BuildingMap = ({ match }: { match: Match }) => {
  const strings = useStrings();
  if (!match || match.tower_status_radiant === undefined) {
    return <div />;
  }

  const buildingData = getBuildingData(match.start_time);

  // see https://wiki.teamfortress.com/wiki/WebAPI/GetMatchDetails
  let bits = pad(match.tower_status_radiant.toString(2), 16).slice(5);
  bits += pad(match.barracks_status_radiant.toString(2), 8).slice(2);
  bits += pad(match.tower_status_dire.toString(2), 16).slice(5);
  bits += pad(match.barracks_status_dire.toString(2), 8).slice(2);
  bits += match.radiant_win ? "10" : "01";
  const icons = [];
  // concat, iterate through bits of all four status values
  // if 1, create image
  // building data in correct order
  // determine ancient display by match winner
  for (let i = 0; i < bits.length; i += 1) {
    let type: string = buildingData[i].id.slice(0, 1);
    //@ts-expect-error
    type =
      (type === "t" && "tower") ||
      (type === "b" &&
        (buildingData[i].id.slice(1, 2) === "m" ? "melee_rax" : "range_rax")) ||
      (type === "a" && "fort");
    const side = buildingData[i].id.slice(-1) === "r" ? "good" : "bad";
    const tier = Number(buildingData[i].id.slice(1, 2)) || "";
    let lane = buildingData[i].id.slice(2, 3);
    lane =
      (tier !== 4 &&
        ((lane === "t" && "top") ||
          (lane === "m" && "mid") ||
          (lane === "b" && "bot") ||
          "")) ||
      "";

    const key = `npc_dota_${side}guys_${type}${tier}${lane && `_${lane}`}`;
    const title =
      strings[
        `${type.includes("rax") ? "building_" : "objective_"}${type}${tier}${type.includes("rax") ? "" : lane && `_${lane}`}` as keyof Strings
      ];

    const destroyedBy = match.players
      .filter((player) => player.killed && player.killed[key] > 0)
      .map((player) => ({
        player_slot: player.player_slot,
      }))[0];
    const damage = match.players
      .filter((player) => player.damage && player.damage[key] > 0)
      .map((player) => ({
        name: player.name || player.personaname || strings.general_anonymous,
        player_slot: player.player_slot,
        hero_id: player.hero_id,
        damage: player.damage[key],
      }));
    let damageByCreeps = damage.map((player) => player.damage).reduce(sum, 0);
    damageByCreeps =
      //@ts-expect-error
      buildingsHealth[type === "tower" ? `tower${tier}` : type] -
      damageByCreeps;

    const props = {
      key: buildingData[i].id,
      src: `/assets/images/dota2/map/${side}guys_${type.includes("rax") ? "rax" : type}${lane === "mid" ? "_angle" : ""}.png`,
      style: {
        span: {
          ...buildingData[i].style,
          position: "absolute",
          width: 0,
          height: 0,
        } as React.CSSProperties,
        img: {
          // TODO scale based on client width
          // d.style += 'zoom: ' + document.getElementById(map').clientWidth / 600 + ';';
          height:
            (type === "fort" && 25) ||
            (type === "tower" && 16) ||
            (type.includes("rax") && 12),
          filter:
            bits[i] === "1"
              ? "contrast(150%)"
              : "grayscale(100%) brightness(70%)",
        } as React.CSSProperties,
      },
    };
    const icon = (
      <span
        key={props.key}
        data-tip
        data-for={props.key}
        style={props.style.span}
      >
        <img src={props.src} alt="" style={props.style.img} />
        <ReactTooltip id={props.key} effect="solid">
          {title}
          {damage && damage.length > 0 && (
            <span>
              <span className={styles.subtitle}> {strings.building_damage}</span>
              <div>
                <div
                  className={styles.buildingHealth}
                  style={{
                    backgroundColor:
                      (bits[i] === "1" && constants.colorMuted) ||
                      (side === "good"
                        ? constants.colorRed
                        : constants.colorGreen),
                  }}
                >
                  {damage.map((player) => (
                    <div
                      key={player.hero_id}
                      style={{
                        width: `${(Number(player.damage) * 100) / buildingsHealth[(type === "tower" ? `tower${tier}` : type) as keyof typeof buildingsHealth]}%`,
                        backgroundColor:
                          playerColors[
                            player.player_slot as unknown as keyof typeof playerColors
                          ],
                      }}
                    />
                  ))}
                </div>
                <div className={styles.damage}>
                  {damage.map((player) => (
                    <div key={player.hero_id}>
                      <img
                        src={
                          heroes[player.hero_id] &&
                          config.VITE_IMAGE_CDN + heroes[player.hero_id].icon
                        }
                        alt=""
                      />
                      <span className={styles.damageValue}>
                        {player.damage}
                      </span>
                      <span
                        style={{
                          color:
                            playerColors[
                              player.player_slot as unknown as keyof typeof playerColors
                            ],
                        }}
                        className={styles.playerName}
                      >
                        {player.name}
                      </span>
                      {destroyedBy &&
                        destroyedBy.player_slot === player.player_slot && (
                          <span className={styles.lasthit}>
                            {(side === "good" &&
                              isRadiant(destroyedBy.player_slot)) ||
                            (side === "bad" &&
                              !isRadiant(destroyedBy.player_slot)) ? (
                              <span className={styles.deny}>
                                {strings.building_denied}
                              </span>
                            ) : (
                              <span>
                                {type !== "fort" && (
                                  <img
                                    src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/tooltips/gold.png`}
                                    alt=""
                                  />
                                )}
                                {strings.building_lasthit}
                              </span>
                            )}
                          </span>
                        )}
                    </div>
                  ))}
                  {damageByCreeps > 0 && bits[i] !== "1" && (
                    <div className={styles.creeps}>
                      <img
                        src="/assets/images/blank-1x1.gif"
                        alt=""
                        style={{
                          backgroundImage: `url(/assets/images/dota2/${side === "good" ? "bad" : "good"}guys_creep.png)`,
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "contain",
                        }}
                      />
                      <span className={styles.damageValue}>
                        {damageByCreeps}
                      </span>
                      <span
                        style={{
                          color:
                            side === "good"
                              ? constants.colorRed
                              : constants.colorGreen,
                        }}
                        className={styles.playerName}
                      >
                        creeps
                      </span>
                      {!destroyedBy && (
                        <span className={styles.lasthit}>
                          {strings.building_lasthit}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </span>
          )}
        </ReactTooltip>
      </span>
    );
    icons.push(icon);
  }

  const radiantSafe = [];
  const radiantMid = [];
  const radiantOff = [];
  const radiantJungle = [];
  const direSafe = [];
  const direMid = [];
  const direOff = [];
  const direJungle = [];
  const roaming = <span className={styles.roaming}>{strings.roaming}</span>;
  for (let i = 0; i < match.players.length; i += 1) {
    const player = (
      <div
        key={
          heroes[match.players[i].hero_id] &&
          heroes[match.players[i].hero_id].name
        }
        data-for={
          heroes[match.players[i].hero_id] &&
          heroes[match.players[i].hero_id].name
        }
        data-tip
      >
        <HeroImage id={match.players[i].hero_id} isIcon />
        <ReactTooltip
          id={
            heroes[match.players[i].hero_id] &&
            heroes[match.players[i].hero_id].name
          }
          effect="solid"
        >
          <span
            className={
              match.players[i].isRadiant ? styles.radiant : styles.dire
            }
          >
            {heroes[match.players[i].hero_id] &&
              heroes[match.players[i].hero_id].localized_name}
          </span>
          <br />
          {match.players[i].is_roaming ? roaming : ""}
          {match.players[i].desc}
        </ReactTooltip>
      </div>
    );

    if (match.players[i].isRadiant) {
      switch (match.players[i].lane) {
        case 1:
          radiantSafe.push(player);
          break;
        case 2:
          radiantMid.push(player);
          break;
        case 3:
          radiantOff.push(player);
          break;
        case 4:
          radiantJungle.push(player);
          break;
        default:
          break;
      }
    } else {
      switch (match.players[i].lane) {
        case 1:
          direOff.push(player);
          break;
        case 2:
          direMid.push(player);
          break;
        case 3:
          direSafe.push(player);
          break;
        case 4:
          direJungle.push(player);
          break;
        default:
          break;
      }
    }
  }

  return (
    <div className={styles.styledDiv}>
      <Heading title={strings.heading_buildings} />
      <Spacer variant="1" />
      <DotaMap startTime={match.start_time} maxWidth={300}>
        {icons}
        <div className={`${styles.heroIcons} ${styles.radiantSafe}`}>
          {radiantSafe}
        </div>
        <div className={`${styles.heroIcons} ${styles.radiantMid}`}>
          {radiantMid}
        </div>
        <div className={`${styles.heroIcons} ${styles.radiantOff}`}>
          {radiantOff}
        </div>
        <div className={`${styles.heroIcons} ${styles.radiantJungle}`}>
          {radiantJungle}
        </div>
        <div className={`${styles.heroIcons} ${styles.direSafe}`}>
          {direSafe}
        </div>
        <div className={`${styles.heroIcons} ${styles.direMid}`}>
          {direMid}
        </div>
        <div className={`${styles.heroIcons} ${styles.direOff}`}>
          {direOff}
        </div>
        <div className={`${styles.heroIcons} ${styles.direJungle}`}>
          {direJungle}
        </div>
      </DotaMap>
      {/* <div className={styles.buildingMap}>
          <img
            src="/assets/images/dota2/map/minimap.jpg"
            alt=""
            className={styles.buildingMapImage}
          />
          {icons}
        </div> */}
      {/* match.version &&
          <div className="hint">
            <IconLightbulb />
            {strings.building_hint}
          </div>
        */}
    </div>
  );
};

export default BuildingMap;
