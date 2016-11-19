import React, { Component } from 'react';
import { formatSeconds } from 'utility';
import ReactTooltip from 'react-tooltip';
import { IconRadiant, IconDire } from 'components/Icons';
import Table from 'components/Table';
import { teamfightColumns } from 'components/Match/matchColumns';
import styles from './index.css';

const MAP_WIDTH = 400;
const iconSize = MAP_WIDTH / 12;

const style = (width, iconSize, location) => ({
  top: ((width / 127) * location.y) - (iconSize / 2),
  left: ((width / 127) * location.x) - (iconSize / 2),
});

const isRadiant = radiantGoldDelta => radiantGoldDelta > 0;

const TeamfightIcon = ({ isRadiant, position, tooltipKey, onClick }) => {
  const IconType = isRadiant ? IconRadiant : IconDire;

  return (
    <IconType
      className={styles.teamfightIcon}
      style={style(MAP_WIDTH, iconSize, position)}
      data-tip
      data-for={tooltipKey}
      onClick={onClick}
    />
  );
};

const getIconStyle = radiantGoldDelta => (isRadiant(radiantGoldDelta) ? styles.radiant : styles.dire);

const Teamfight = ({ position, tooltipKey, start, end, onClick, radiantGoldDelta, selected }) => (
  <div>
    <div
      className={`${selected && styles.selected} ${getIconStyle(radiantGoldDelta)}`}
    >
      <TeamfightIcon
        onClick={() => onClick(start)}
        position={position}
        isRadiant={isRadiant(radiantGoldDelta)}
        tooltipKey={tooltipKey}
      />
    </div>
    <ReactTooltip
      id={tooltipKey}
      effect="float"
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

class TeamfightMap extends Component {
  constructor(props) {
    super();
    this.selectTeamfight = this.selectTeamfight.bind(this);
    this.isSelected = this.isSelected.bind(this);
    const { teamfights = [] } = props;
    this.state = {
      selectedTeamfight: teamfights.length > 0 ? teamfights[0].start : null,
    };
  }

  selectTeamfight(start) {
    this.setState({ selectedTeamfight: start });
  }

  isSelected({ start }) {
    return this.state.selectedTeamfight === start;
  }

  render() {
    const { teamfights = [] } = this.props;
    const { selectedTeamfight } = this.state;
    return (
      <div className={styles.teamfightContainer}>
        <div className={styles.map}>
          {teamfights.map((teamfight, index) => (
            <Teamfight
              onClick={this.selectTeamfight}
              selected={this.isSelected(teamfight)}
              key={index}
              position={avgPosition(teamfight)}
              tooltipKey={`${index}_${teamfight.start}`}
              start={teamfight.start}
              end={teamfight.end}
              radiantGoldDelta={teamfight.radiant_gold_delta}
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
    );
  }
}

export default TeamfightMap;
