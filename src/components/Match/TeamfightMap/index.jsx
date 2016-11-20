import React, { Component } from 'react';
import { formatSeconds, calculateDistance, calculateRelativeXY } from 'utility';
import ReactTooltip from 'react-tooltip';
import Measure from 'react-measure';
import { IconRadiant, IconDire, IconTombstone } from 'components/Icons';
import { TeamTable } from 'components/Match/matchPages';
import { teamfightColumns } from 'components/Match/matchColumns';
import styles from './index.css';

const MAP_WIDTH = 400;
const iconSize = mapWidth => (mapWidth / 12 <= 15 ? 15 : mapWidth / 12);

const style = (width, position) => ({
  width: iconSize(width),
  height: iconSize(width),
  top: ((width / 127) * position.y) - (iconSize(width) / 2),
  left: ((width / 127) * position.x) - (iconSize(width) / 2),
});

const isRadiant = radiantGoldDelta => radiantGoldDelta > 0;

const IconType = isRadiant => (isRadiant ? IconRadiant : IconDire);

const TeamfightIcon = ({ position, tooltipKey, mapWidth = MAP_WIDTH, onClick, Icon, ...props }) => (
  <Icon
    className={styles.teamfightIcon}
    style={style(mapWidth, position)}
    data-tip
    data-for={tooltipKey}
    onClick={onClick}
    {...props}
  />
);

const GoldDelta = ({ radiantGoldDelta }) => (
  <div className={styles.goldChange}>
    {isRadiant(radiantGoldDelta) ? radiantGoldDelta : radiantGoldDelta * -1}
    <img src={`${API_HOST}/apps/dota2/images/tooltips/gold.png`} role="presentation" />
  </div>
);

const getIconStyle = radiantGoldDelta => (isRadiant(radiantGoldDelta) ? styles.radiant : styles.dire);
const getSelectedStyle = radiantGoldDelta =>
  (isRadiant(radiantGoldDelta) ? styles.radiantSelected : styles.direSelected);

const Tombstones = ({ deathPositions, mapWidth }) => (
  <div>
    {deathPositions.map((position, index) => (
      <TeamfightIcon
        key={index}
        Icon={IconTombstone}
        position={position}
        mapWidth={mapWidth}
        className={styles.tombstone}
      />
    ))}
  </div>
);

const Teamfight = ({
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
      const newAvg = {
        x: avg.x + position.x,
        y: avg.y + position.y,
      };

      if (index === deathPositions.length - 1) {
        newAvg.x /= deathPositions.length;
        newAvg.y /= deathPositions.length;
      }
      return newAvg;
    }, {
      x: null,
      y: null,
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
    const Icon = IconType(isRadiant(teamfight.radiant_gold_delta));
    return (
      <Measure>
        {({ width }) => (
          <div className={`${styles.container} ${getSelectedStyle(teamfight.radiant_gold_delta)}`}>
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
                      radiantGoldDelta={teamfight.radiant_gold_delta}
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
                    <div className={getIconStyle(teamfight.radiant_gold_delta)}>
                      <Icon style={{ height: iconSize(bindWidth(width)), width: iconSize(bindWidth(width)) }} />
                    </div>
                    <span className={styles.headerGold}><GoldDelta radiantGoldDelta={teamfight.radiant_gold_delta} /></span>
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
