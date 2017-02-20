import React, { Component, PropTypes } from 'react';
import { formatSeconds, calculateDistance, calculateRelativeXY, bindWidth } from 'utility';
import ReactTooltip from 'react-tooltip';
import Measure from 'react-measure';
import classNames from 'classnames';
import { IconRadiant, IconDire, IconDot } from 'components/Icons';
import TeamTable from 'components/Match/TeamTable';
import { teamfightColumns } from 'components/Match/matchColumns';
import PlayerThumb from 'components/Match/PlayerThumb';
import strings from 'lang';
import Timeline from 'components/Match/Overview/Timeline';
import DotaMap from 'components/DotaMap';
import styles from './TeamfightMap.css';

const MAP_WIDTH = 400;
const iconSize = (mapWidth, factor = 12, minSize = 15) =>
  (mapWidth / factor <= minSize ? minSize : mapWidth / factor);

const style = (width, position, iconSizeOverride, options = { noTopAdjustment: false }) => ({
  width: iconSizeOverride || iconSize(width),
  height: iconSizeOverride || iconSize(width),
  top: options.noTopAdjustment ? ((width / 127) * position.y) : ((width / 127) * position.y) - (iconSizeOverride || iconSize(width) / 2),
  left: ((width / 127) * position.x) - (iconSizeOverride || iconSize(width) / 2),
});

const isRadiant = radiantGoldDelta => radiantGoldDelta > 0;

const IconType = isRadiant => (isRadiant ? IconRadiant : IconDire);

export const TeamfightIcon = ({ position, tooltipKey, mapWidth = MAP_WIDTH, onClick, Icon, style: overStyle, ...props }) => (
  <Icon
    className={styles.teamfightIcon}
    style={overStyle || style(mapWidth, position)}
    data-tip
    data-for={tooltipKey}
    onClick={onClick}
    {...props}
  />
);

export const GoldDelta = ({ radiantGoldDelta }) => (
  <div className={styles.goldChange}>
    {isRadiant(radiantGoldDelta) ? radiantGoldDelta : radiantGoldDelta * -1}
    <img src={`${API_HOST}/apps/dota2/images/tooltips/gold.png`} role="presentation" />
  </div>
);

const getIconStyle = radiantGoldDelta => (isRadiant(radiantGoldDelta) ? styles.radiant : styles.dire);
const getSelectedStyle = radiantGoldDelta =>
  (isRadiant(radiantGoldDelta) ? styles.radiantSelected : styles.direSelected);

const getTombStyle = position => position.reduce(
  (str, position) => {
    const radStr = position.isRadiant ? 'radiant' : 'dire';
    if (str !== radStr) {
      return 'both';
    }
    return str;
  },
  position[0].isRadiant ? 'radiant' : 'dire',
);

export const Tombstones = ({ deathPositions, mapWidth, tooltipKey }) => (
  <div>
    {deathPositions.map((position, index) => (
      <div key={index}>
        <TeamfightIcon
          Icon={IconDot}
          position={position[0]}
          mapWidth={mapWidth}
          tooltipKey={`${index}_${tooltipKey}`}
          className={styles[`${getTombStyle(position)}Tombstone`]}
          style={style(mapWidth, position[0], iconSize(mapWidth, 20))}
        />
        <ReactTooltip
          id={`${index}_${tooltipKey}`}
          effect="solid"
          border
          class={styles[`${getTombStyle(position)}TombstoneTooltip`]}
        >
          {position.map((pos, index) => (
            <div key={index} className={styles.tooltipContainer}>
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
}) => (
  <div>
    <div className={getIconStyle(radiantGoldDelta)}>
      <div className={classNames(styles.teamfightIconSvg, hovered && styles.hovered, selected && styles.selected)}>
        <TeamfightIcon
          position={position}
          isRadiant={isRadiant(radiantGoldDelta)}
          tooltipKey={tooltipKey}
          mapWidth={mapWidth}
          onClick={onClick}
          Icon={IconType(isRadiant(radiantGoldDelta))}
        />
      </div>
      <ReactTooltip
        id={tooltipKey}
        effect="solid"
      >
        <div className={styles.teamfightTooltipContainer}>
          <div>{formatSeconds(start)} - {formatSeconds(end)}</div>
          <div>
            <GoldDelta radiantGoldDelta={radiantGoldDelta} />
          </div>
        </div>
      </ReactTooltip>
    </div>
    {selected && <Tombstones deathPositions={deathPositions} mapWidth={mapWidth} tooltipKey={tooltipKey} />}
  </div>
);

const avgPosition = ({ deaths_pos: deathPositions }) => {
  const avgs = deathPositions.reduce(
    (avg, position, index) => {
      const posTotal = position.reduce(
        (avg, position) => ({
          x: avg.x + position.x,
          y: avg.y + position.y,
          length: avg.length + 1,
        }), {
          x: 0,
          y: 0,
          length: 0,
        });
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
    }, {
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

class TeamfightMap extends Component {
  constructor(props) {
    super();
    this.isSelected = this.isSelected.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onIconClick = this.onIconClick.bind(this);
    this.onTimelineIconClick = this.onTimelineIconClick.bind(this);
    this.onTimelineHover = this.onTimelineHover.bind(this);
    this.onTeamfightHover = this.onTeamfightHover.bind(this);
    this.curriedTeamfightHandler = this.curriedTeamfightHandler.bind(this);
    const { teamfights = [] } = props;
    const teamfight = teamfights.length > 0 ? teamfights[0] : null;
    this.state = {
      teamfight,
    };
  }

  onTimelineIconClick(start) {
    return this.curriedTeamfightHandler(this.onIconClick, start);
  }

  onTimelineHover(start) {
    return this.curriedTeamfightHandler(this.onTeamfightHover, start);
  }

  onTeamfightHover(teamfight) {
    return () => {
      this.setState({
        hoveredTeamfight: teamfight,
      });
    };
  }

  onIconClick(teamfight) {
    return () => {
      // We do this because we need to prevent the map click event from
      // being executed. That click event is innaccurate if the actual icon is clicked.
      // event.stopPropagation();
      this.setState({
        teamfight,
      });
    };
  }

  onMapClick(width) {
    return (event) => {
      const { x: x1, y: y1 } = calculateRelativeXY(event);
      const { teamfights } = this.props;
      const newSelection = teamfights
        .reduce((cursor, teamfight) => {
          let newCursor = { ...cursor };
          const { left: x2, top: y2 } = style(width, avgPosition(teamfight));
          const distance = calculateDistance(x1, y1, x2 + (iconSize(width) / 2), y2 + (iconSize(width) / 2));
          if (distance < cursor.distance) {
            newCursor = {
              teamfight,
              distance,
            };
          }
          return newCursor;
        }, {
          teamfight: this.state.teamfight,
          distance: Infinity,
        });
      this.setState({
        teamfight: newSelection.teamfight,
      });
    };
  }

  curriedTeamfightHandler(fn, start) {
    return (event) => {
      fn(this.props.teamfights.find(tf => tf.start === start))(event);
    };
  }

  isHovered(teamfight = { start: null }) {
    return this.state.hoveredTeamfight && this.state.hoveredTeamfight.start === teamfight.start;
  }

  isSelected(teamfight = { start: null }) {
    return this.state.teamfight && this.state.teamfight.start === teamfight.start;
  }

  render() {
    const { teamfights = [], match } = this.props;
    const { teamfight } = this.state;
    const Icon = IconType(isRadiant(teamfight.radiant_gold_advantage_delta));
    return (
      <Measure>
        {({ width }) => (
          <div>
            <div className={styles.timelineContainer}>
              <Timeline
                match={match}
                onTeamfightClick={this.onTimelineIconClick}
                onTeamfightHover={this.onTimelineHover}
                selectedTeamfight={teamfight && teamfight.start}
              />
            </div>
            <div className={`${styles.container} ${getSelectedStyle(teamfight.radiant_gold_advantage_delta)}`}>
              <div className={styles.teamfightContainer}>
                <div className={styles.mapAndInfoContainer}>
                  <DotaMap
                    width={width}
                    maxWidth={400}
                    startTime={match.start_time}
                  >
                    {teamfights.map((teamfight, index) => (
                      <Teamfight
                        selected={this.isSelected(teamfight)}
                        hovered={this.isHovered(teamfight)}
                        key={index}
                        onClick={this.onIconClick(teamfight)}
                        position={avgPosition(teamfight)}
                        tooltipKey={`${index}_${teamfight.start}`}
                        start={teamfight.start}
                        end={teamfight.end}
                        radiantGoldDelta={teamfight.radiant_gold_advantage_delta}
                        deathPositions={teamfight.deaths_pos}
                        mapWidth={bindWidth(width, 400)}
                      />
                    ))}
                  </DotaMap>
                  <header className={styles.header}>
                    <div className={styles.muted}>
                      {formatSeconds(teamfight.start)} - {formatSeconds(teamfight.end)}
                    </div>
                    <div className={styles.headerSubInfo}>
                      <div className={getIconStyle(teamfight.radiant_gold_advantage_delta)}>
                        <Icon style={{ height: iconSize(bindWidth(width, 400)), width: iconSize(bindWidth(width, 400)) }} />
                      </div>
                      <span className={styles.headerGold}><GoldDelta radiantGoldDelta={teamfight.radiant_gold_advantage_delta} /></span>
                      <div className={styles.muted}>{teamfight.deaths_pos.length} Deaths</div>
                    </div>
                  </header>
                </div>
                <div className={styles.tableContainer}>
                  <TeamTable
                    players={teamfight.players && teamfight.players.filter(p => p.participate)}
                    columns={teamfightColumns}
                    radiantTeam={this.props.match.radiant_team} direTeam={this.props.match.dire_team}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Measure>
    );
  }
}

const { arrayOf, object, shape, number, bool, func, string, array } = PropTypes;
const positionShape = {
  x: number.isRequired,
  y: number.isRequired,
};

TeamfightIcon.propTypes = {
  position: shape(positionShape).isRequired,
  tooltipKey: string.isRequired,
  mapWidth: number,
  onClick: func, // not required because tombstone doesn't need click fn
  Icon: func.isRequired,
  style: object,
};

GoldDelta.propTypes = {
  radiantGoldDelta: number.isRequired,
};

Tombstones.propTypes = {
  tooltipKey: string.isRequired,
  mapWidth: number.isRequired,
  deathPositions: arrayOf(array).isRequired,
};

Teamfight.propTypes = {
  position: shape(positionShape),
  tooltipKey: string.isRequired,
  start: number.isRequired,
  end: number.isRequired,
  radiantGoldDelta: number.isRequired,
  selected: bool,
  hovered: bool,
  mapWidth: number.isRequired,
  onClick: func.isRequired,
  deathPositions: arrayOf(array).isRequired,
};

TeamfightMap.propTypes = {
  teamfights: arrayOf(object).isRequired,
  match: object.isRequired,
};

export default TeamfightMap;
