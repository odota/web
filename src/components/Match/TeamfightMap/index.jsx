import React, { Component } from 'react';
import { formatSeconds, calculateDistance, calculateRelativeXY } from 'utility';
import ReactTooltip from 'react-tooltip';
import Measure from 'react-measure';
import { IconRadiant, IconDire, IconTombstone } from 'components/Icons';
import { TeamTable } from 'components/Match/matchPages';
import { teamfightColumns } from 'components/Match/matchColumns';
import PlayerThumb from 'components/Match/PlayerThumb';
import strings from 'lang';
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

// TODO - fix this bug where radiant is always either unstyled or gets the 'both' string here
const getTombStyle = position => {
  console.log(position)
  const test = position.reduce(
  (str, position) => {
    const radStr = position.isRadiant ? 'radiant' : 'dire';
    if (str !== radStr) {
      return 'both';
    }
    return str;
  },
  position[0].isRadiant ? 'radiant' : 'dire',
);
 return test;
};

export const Tombstones = ({ deathPositions, mapWidth, tooltipKey }) => (
  <div>
    {console.log('deathPositions', deathPositions)}
    {deathPositions.map((position, index) => {
      return (
        <div>
          <TeamfightIcon
            key={index}
            Icon={IconTombstone}
            position={position[0]}
            mapWidth={mapWidth}
            tooltipKey={`${index}_${tooltipKey}`}
            className={styles[`${getTombStyle(position)}Tombstone`]}
            style={style(mapWidth, position[0], 17, { noTopAdjustment: true })}
          />
          <ReactTooltip
            id={`${index}_${tooltipKey}`}
            effect="solid"
          >
            {position.map((pos, index) => (
              <div key={index} className={styles.tooltipContainer}>
                <div className={styles.tombText}>{strings.tooltip_tombstone_victim}</div>
                <PlayerThumb {...pos.player} />
                <div className={styles.tombText}>{strings.tooltip_tombstone_killer}</div>
                <PlayerThumb {...pos.killer} />
              </div>
            ))}
          </ReactTooltip>
        </div>
      );
    })}
  </div>
);

export const Teamfight = ({
  position,
  tooltipKey,
  start,
  end,
  radiantGoldDelta,
  selected,
  mapWidth,
  onClick,
  deathPositions,
}) => (
  <div>
    {console.log('position', position)}
    <div className={getIconStyle(radiantGoldDelta)}>
      <div className={selected && styles.selected}>
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
        <div className={styles.tooltipContainer}>
          <div>{formatSeconds(start)} - {formatSeconds(end)}</div>
          <div>
            <GoldDelta radiantGoldDelta={radiantGoldDelta} />
          </div>
        </div>
      </ReactTooltip>
    </div>
    {selected && <Tombstones deathPositions={deathPositions} mapWidth={mapWidth} />}
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
  return avgs;
};

const bindWidth = width => (width >= 400 ? 400 : width);

const setMapSizeStyle = width => ({
  width: bindWidth(width),
  height: bindWidth(width),
});

class TeamfightMap extends Component {
  constructor(props) {
    super();
    this.selectTeamfight = this.selectTeamfight.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onIconClick = this.onIconClick.bind(this);
    const { teamfights = [] } = props;
    const teamfight = teamfights.length > 0 ? teamfights[0] : null;
    this.state = {
      selectedTeamfight: teamfight ? teamfight.start : null,
      teamfight,
    };
  }

  onIconClick(teamfight) {
    return (event) => {
      // We do this because we need to prevent the map click event from
      // being executed. That click event is innaccurate if the actual icon is clicked.
      event.stopPropagation();
      this.setState({
        selectedTeamfight: teamfight.start,
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
              key: teamfight.start,
              teamfight,
              distance,
            };
          }
          return newCursor;
        }, {
          key: this.state.selectedTeamfight,
          teamfight: this.state.teamfight,
          distance: Infinity,
        });
      this.setState({
        selectedTeamfight: newSelection.key,
        teamfight: newSelection.teamfight,
      });
    };
  }

  isSelected({ start }) {
    return this.state.selectedTeamfight === start;
  }

  selectTeamfight(start, teamfight) {
    this.setState({
      selectedTeamfight: start,
      teamfight,
    });
  }

  render() {
    const { teamfights = [] } = this.props;
    const { teamfight } = this.state;
    const Icon = IconType(isRadiant(teamfight.radiant_networth_advantage_delta));
    return (
      <Measure>
        {({ width }) => (
          <div className={`${styles.container} ${getSelectedStyle(teamfight.radiant_networth_advantage_delta)}`}>
            <div className={styles.teamfightContainer}>
              <div className={styles.mapAndInfoContainer}>
                <div
                  className={styles.map}
                  onClick={this.onMapClick(bindWidth(width))}
                  style={setMapSizeStyle(width)}
                >
                  {teamfights.map((teamfight, index) => (
                    <Teamfight
                      selected={this.isSelected(teamfight)}
                      key={index}
                      onClick={this.onIconClick(teamfight)}
                      position={avgPosition(teamfight)}
                      tooltipKey={`${index}_${teamfight.start}`}
                      start={teamfight.start}
                      end={teamfight.end}
                      radiantGoldDelta={teamfight.radiant_networth_advantage_delta}
                      deathPositions={teamfight.deaths_pos}
                      mapWidth={bindWidth(width)}
                    />
                  ))}
                </div>
                <header className={styles.header}>
                  <div className={styles.muted}>
                    {formatSeconds(teamfight.start)} - {formatSeconds(teamfight.end)}
                  </div>
                  <div className={styles.headerSubInfo}>
                    <div className={getIconStyle(teamfight.radiant_networth_advantage_delta)}>
                      <Icon style={{ height: iconSize(bindWidth(width)), width: iconSize(bindWidth(width)) }} />
                    </div>
                    <span className={styles.headerGold}><GoldDelta radiantGoldDelta={teamfight.radiant_networth_advantage_delta} /></span>
                    <div className={styles.muted}>{teamfight.deaths_pos.length} Deaths</div>
                  </div>
                </header>
              </div>
              <div className={styles.tableContainer}>
                <TeamTable
                  players={teamfight.players && teamfight.players.filter(p => p.participate)}
                  columns={teamfightColumns}
                />
              </div>
            </div>
          </div>
        )}
      </Measure>
    );
  }
}

export default TeamfightMap;
