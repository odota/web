import React from "react";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import {
  formatSeconds,
  calculateDistance,
  calculateRelativeXY,
  bindWidth,
} from "../../../utility";
import { IconRadiant, IconDire, IconDot } from "../../Icons";
import TeamTable from "../TeamTable";
import mcs from "../matchColumns";
import PlayerThumb from "../PlayerThumb/PlayerThumb";
import Timeline from "../Timeline";
import DotaMap from "../../DotaMap/DotaMap";
import config from "../../../config";
import useStrings from "../../../hooks/useStrings.hook";
import styles from "./TeamfightMap.module.css";

const iconSize = (mapWidth: number, factor = 12, minSize = 15) =>
  mapWidth / factor <= minSize ? minSize : mapWidth / factor;

const style = (
  width: number,
  position: { x: number; y: number },
  iconSizeOverride?: number,
  options = { noTopAdjustment: false },
) => ({
  width: iconSizeOverride || iconSize(width),
  height: iconSizeOverride || iconSize(width),
  top: options.noTopAdjustment
    ? (width / 127) * position.y
    : (width / 127) * position.y - (iconSizeOverride || iconSize(width) / 2),
  left: (width / 127) * position.x - (iconSizeOverride || iconSize(width) / 2),
});

const isRadiant = (radiantGoldDelta: number) => radiantGoldDelta > 0;

const IconType = (_isRadiant: boolean) => (_isRadiant ? IconRadiant : IconDire);

export const TeamfightIcon = ({
  position,
  tooltipKey,
  mapWidth,
  onClick,
  Icon,
  className,
  ...props
}: {
  position: { x: number; y: number };
  tooltipKey: string;
  mapWidth: number;
  onClick?: Function;
  Icon: any;
  isRadiant?: boolean;
  className?: string;
  style?: any;
}) => (
  <Icon
    className={className || styles.teamfightIcon}
    style={style(mapWidth, position)}
    data-tip
    data-for={tooltipKey}
    onClick={onClick}
    {...props}
  />
);

export const GoldDelta = ({
  radiantGoldDelta,
}: {
  radiantGoldDelta: number;
}) => (
  <div className={styles.goldChange}>
    {isRadiant(radiantGoldDelta) ? radiantGoldDelta : radiantGoldDelta * -1}
    <img
      src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/tooltips/gold.png`}
      alt="Gold"
    />
  </div>
);

const getIconStyle = (radiantGoldDelta: number) =>
  isRadiant(radiantGoldDelta) ? styles.radiant : styles.dire;
const getSelectedStyle = (radiantGoldDelta: number) =>
  isRadiant(radiantGoldDelta) ? styles.radiantSelected : styles.direSelected;

const getTombStyle = (position: any[]) =>
  position.reduce(
    (str, _position) => {
      const radStr = _position.isRadiant ? "radiant" : "dire";
      if (str !== radStr) {
        return "both";
      }
      return str;
    },
    position[0].isRadiant ? "radiant" : "dire",
  );

export const Tombstones = ({
  deathPositions,
  mapWidth,
  tooltipKey,
}: {
  deathPositions: any[][];
  mapWidth: number;
  tooltipKey: string;
}) => {
  const strings = useStrings();
  return (
    <div>
      {deathPositions.map((position, index) => (
        <div key={index}>
          <TeamfightIcon
            Icon={IconDot}
            position={position[0]}
            mapWidth={mapWidth}
            tooltipKey={`${index}_${tooltipKey}`}
            className={`${styles.mapIcon} ${styles[`${getTombStyle(position)}Tombstone`] || ""}`}
            style={style(mapWidth, position[0], iconSize(mapWidth, 20))}
          />
          <ReactTooltip
            id={`${index}_${tooltipKey}`}
            effect="solid"
            border
            class={styles[`${getTombStyle(position)}TombstoneTooltip`] || ""}
          >
            {position.map((pos, _index) => (
              <div key={_index} className={styles.tooltipContainer}>
                <PlayerThumb {...pos.player} />
                <div>{strings.tooltip_tombstone_killer}</div>
                <PlayerThumb {...pos.killer} />
              </div>
            ))}
          </ReactTooltip>
        </div>
      ))}
    </div>
  );
};

export const Teamfight = ({
  position,
  tooltipKey,
  start,
  end,
  radiantGoldDelta,
  selected,
  hovered,
  mapWidth,
  onClick,
  deathPositions,
}: {
  position: any;
  tooltipKey: string;
  start: number;
  end: number;
  radiantGoldDelta: number;
  selected: boolean;
  hovered: boolean;
  mapWidth: number;
  onClick?: Function;
  deathPositions: any[];
}) => {
  return (
    <div>
      <div className={getIconStyle(radiantGoldDelta)}>
        <div
          className={`${styles.teamfightIconSvg} ${hovered ? styles.hovered : ""} ${selected ? styles.selected : ""}`}
        >
          <TeamfightIcon
            position={position}
            isRadiant={isRadiant(radiantGoldDelta)}
            tooltipKey={tooltipKey}
            mapWidth={mapWidth}
            onClick={onClick}
            Icon={IconType(isRadiant(radiantGoldDelta))}
          />
        </div>
        <ReactTooltip id={tooltipKey} effect="solid">
          <div
            className={`${styles.tooltipContainer} ${styles.teamfightTooltipContainer}`}
          >
            <div>
              {formatSeconds(start)} - {formatSeconds(end)}
            </div>
            <div>
              <GoldDelta radiantGoldDelta={radiantGoldDelta} />
            </div>
          </div>
        </ReactTooltip>
      </div>
      {selected && (
        <Tombstones
          deathPositions={deathPositions}
          mapWidth={mapWidth}
          tooltipKey={tooltipKey}
        />
      )}
    </div>
  );
};

const avgPosition = ({
  deaths_pos: deathPositions,
}: {
  deaths_pos: any[][];
}) => {
  const avgs = deathPositions.reduce(
    (avg, position, index) => {
      const posTotal = position.reduce(
        (_avg, _position) => ({
          x: _avg.x + _position.x,
          y: _avg.y + _position.y,
          length: _avg.length + 1,
        }),
        {
          x: 0,
          y: 0,
          length: 0,
        },
      );
      const newAvg = {
        x: avg.x + posTotal.x,
        y: avg.y + posTotal.y,
        length: avg.length + posTotal.length,
      };

      if (index === deathPositions.length - 1) {
        newAvg.x /= newAvg.length;
        newAvg.y /= newAvg.length;
      }
      return newAvg;
    },
    {
      x: 0,
      y: 0,
      length: 0,
    },
  );
  return {
    x: avgs.x,
    y: avgs.y,
  };
};

type TeamfightMapProps = {
  teamfights: any[];
  match: Match;
  strings: Strings;
};

class TeamfightMap extends React.Component<
  TeamfightMapProps,
  { teamfight: any; hoveredTeamfight?: any }
> {
  constructor(props: TeamfightMapProps) {
    super(props);
    const { teamfights = [] } = props;
    const teamfight = teamfights.length > 0 ? teamfights[0] : null;
    this.state = {
      teamfight,
    };
  }

  onIconClick = (teamfight: any) => () => {
    // We do this because we need to prevent the map click event from
    // being executed. That click event is innaccurate if the actual icon is clicked.
    // event.stopPropagation();
    this.setState({
      teamfight,
    });
  };

  onMapClick = (width: number) => (event: any) => {
    const { x: x1, y: y1 } = calculateRelativeXY(event);
    const { teamfights } = this.props;
    const newSelection = teamfights.reduce(
      (cursor, teamfight) => {
        let newCursor = { ...cursor };
        const { left: x2, top: y2 } = style(width, avgPosition(teamfight));
        const distance = calculateDistance(
          x1,
          y1,
          x2 + iconSize(width) / 2,
          y2 + iconSize(width) / 2,
        );
        if (distance < cursor.distance) {
          newCursor = {
            teamfight,
            distance,
          };
        }
        return newCursor;
      },
      {
        teamfight: this.state.teamfight,
        distance: Infinity,
      },
    );
    this.setState({
      teamfight: newSelection.teamfight,
    });
  };

  onTeamfightHover = (teamfight: any) => () => {
    this.setState({
      hoveredTeamfight: teamfight,
    });
  };

  onTimelineHover = (start: number) =>
    this.curriedTeamfightHandler(this.onTeamfightHover, start);

  onTimelineIconClick = (start: number) =>
    this.curriedTeamfightHandler(this.onIconClick, start);

  curriedTeamfightHandler = (fn: Function, start: number) => (event: any) => {
    fn(this.props.teamfights.find((tf) => tf.start === start))(event);
  };

  isSelected = (teamfight = { start: null }) =>
    this.state.teamfight && this.state.teamfight.start === teamfight.start;

  isHovered(teamfight = { start: null }) {
    return (
      this.state.hoveredTeamfight &&
      this.state.hoveredTeamfight.start === teamfight.start
    );
  }

  render() {
    const { teamfights = [], match, strings } = this.props;
    const teamfight = this.state.teamfight || {};
    const Icon = IconType(isRadiant(teamfight.radiant_gold_advantage_delta));
    const { teamfightColumns } = mcs(strings);
    return (
      <div>
        <div className={styles.timelineContainer}>
          <Timeline
            match={match}
            onTeamfightClick={this.onTimelineIconClick}
            onTeamfightHover={this.onTimelineHover}
            selectedTeamfight={teamfight && teamfight.start}
          />
        </div>
        <div
          className={`${styles.parentContainer} ${getSelectedStyle(teamfight.radiant_gold_advantage_delta)}`}
        >
          <div className={styles.teamfightContainer}>
            <div className={styles.mapAndInfoContainer}>
              <DotaMap width={400} maxWidth={400} startTime={match.start_time}>
                {teamfights.map((teamFight, index) => (
                  <Teamfight
                    selected={this.isSelected(teamFight)}
                    hovered={this.isHovered(teamFight)}
                    key={teamFight.start}
                    onClick={this.onIconClick(teamFight)}
                    position={avgPosition(teamFight)}
                    tooltipKey={`${index}_${teamFight.start}`}
                    start={teamFight.start}
                    end={teamFight.end}
                    radiantGoldDelta={teamFight.radiant_gold_advantage_delta}
                    deathPositions={teamFight.deaths_pos}
                    mapWidth={400}
                  />
                ))}
              </DotaMap>
              <header className={styles.header}>
                <div className="muted">
                  {formatSeconds(teamfight.start)} -{" "}
                  {formatSeconds(teamfight.end)}
                </div>
                <div className={styles.headerSubInfo}>
                  <div
                    className={getIconStyle(
                      teamfight.radiant_gold_advantage_delta,
                    )}
                  >
                    <Icon
                      style={{
                        height: iconSize(bindWidth(400, 400)),
                        width: iconSize(bindWidth(400, 400)),
                      }}
                    />
                  </div>
                  <span className={styles.headerGold}>
                    <GoldDelta
                      radiantGoldDelta={teamfight.radiant_gold_advantage_delta}
                    />
                  </span>
                </div>
              </header>
            </div>
            <div className={styles.tableContainer}>
              <TeamTable
                players={teamfight.players}
                columns={teamfightColumns}
                heading={strings.heading_teamfights}
                // buttonLabel={
                //   config.VITE_ENABLE_GOSUAI ? strings.gosu_teamfights : null
                // }
                // buttonTo={`${sponsorURL}Teamfights`}
                // buttonIcon={sponsorIcon}
                radiantTeam={this.props.match.radiant_team}
                direTeam={this.props.match.dire_team}
                radiantWin={match.radiant_win}
                hideWinnerTag
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(TeamfightMap);
