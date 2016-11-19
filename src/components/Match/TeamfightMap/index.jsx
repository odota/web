import React, { Component } from 'react';
import { formatSeconds, calculateDistance, calculateRelativeXY } from 'utility';
import ReactTooltip from 'react-tooltip';
import Measure from 'react-measure';
import { IconRadiant, IconDire } from 'components/Icons';
import Table from 'components/Table';
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

const TeamfightIcon = ({ isRadiant, position, tooltipKey, mapWidth = MAP_WIDTH }) => {
  const IconType = isRadiant ? IconRadiant : IconDire;

  return (
    <IconType
      className={styles.teamfightIcon}
      style={style(mapWidth, position)}
      data-tip
      data-for={tooltipKey}
    />
  );
};

const getIconStyle = radiantGoldDelta => (isRadiant(radiantGoldDelta) ? styles.radiant : styles.dire);

const Teamfight = ({ position, tooltipKey, start, end, radiantGoldDelta, selected, mapWidth }) => (
  <div>
    <div
      className={`${selected && styles.selected} ${getIconStyle(radiantGoldDelta)}`}
    >
      <TeamfightIcon
        position={position}
        isRadiant={isRadiant(radiantGoldDelta)}
        tooltipKey={tooltipKey}
        mapWidth={mapWidth}
      />
    </div>
    <ReactTooltip
      id={tooltipKey}
      effect="solid"
    >
      <div>{formatSeconds(start)} - {formatSeconds(end)}</div>
      <div>
        <span className={styles.goldChange}>
          {isRadiant(radiantGoldDelta) ? radiantGoldDelta : radiantGoldDelta * -1}
        </span> Gold
      </div>
    </ReactTooltip>
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
    const { teamfights = [] } = props;
    this.state = {
      selectedTeamfight: teamfights.length > 0 ? teamfights[0].start : null,
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
              distance,
            };
          }
          return newCursor;
        }, {
          key: this.state.selectedTeamfight,
          distance: Infinity,
        });
      this.setState({
        selectedTeamfight: newSelection.key,
      });
    };
  }

  isSelected({ start }) {
    return this.state.selectedTeamfight === start;
  }

  selectTeamfight(start) {
    this.setState({ selectedTeamfight: start });
  }

  render() {
    const { teamfights = [] } = this.props;
    const { selectedTeamfight } = this.state;
    return (
      <Measure>
        {({ width }) => (
          <div className={styles.teamfightContainer}>
            <div className={styles.map} onClick={this.onMapClick(bindWidth(width))} style={setMapSizeStyle(width)}>
              {teamfights.map((teamfight, index) => (
                <Teamfight
                  selected={this.isSelected(teamfight)}
                  key={index}
                  position={avgPosition(teamfight)}
                  tooltipKey={`${index}_${teamfight.start}`}
                  start={teamfight.start}
                  end={teamfight.end}
                  radiantGoldDelta={teamfight.radiant_gold_delta}
                  mapWidth={bindWidth(width)}
                />
              ))}
            </div>
            <div className={styles.tableContainer}>
              <Table
                data={
                  teamfights.find(teamfight => teamfight.start === selectedTeamfight)
                  .players.filter(p => p.participate)
                }
                columns={teamfightColumns}
              />
            </div>
          </div>
        )}
      </Measure>
    );
  }
}

export default TeamfightMap;
