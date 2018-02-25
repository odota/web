import Heading from 'components/Heading';
import { IconRadiant, IconDire } from 'components/Icons';
import heroes from 'dotaconstants/build/heroes.json';
import Next from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Prev from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import { TableBody, TableRow, TableRowColumn, Table } from 'material-ui/Table';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { getTeamName } from 'utility';
import constants from '../../constants';

const Styled = styled.div`
max-width: 800px;
margin: 0 auto;

.draft-row:nth-of-type(odd) {
  background-color: ${constants.tableRowOddSurfaceColor};
}

.teams {
  display: flex;
  justify-content: space-between;
}

.nodata {
  display: flex;
  justify-content: center;
}
`;

const PickBan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
`;

const Pick = PickBan.extend`
  color: ${constants.colorGreen};
  svg {
    color: ${constants.colorGreen};
  }
`;

const Ban = PickBan.extend`
  color: ${constants.colorDanger};
  svg {
    color: ${constants.colorDanger};
  }
`;

const DraftCell = styled.div`
  display: flex;
  width: fit-content;
  margin-left: ${props => (props.radiant ? '0' : 'auto')};

  .time-tracker {
    display: flex;
    flex-direction: column;
    align-items: ${props => (props.radiant ? 'flex-start' : 'flex-end')};
    justify-content: space-around;
    order: ${props => (props.radiant ? '1' : '-1')};
    padding: 8px;
  }

  .taken {
    font-size: 16px;
  }

  .left {
    font-size: 13px;
  }

  .extra-used {
    color: ${constants.colorDanger}
  }

  @media only screen and (max-width: 650px) {
    flex-direction: column;

    .time-tracker {
      order: 1;
    }
  }
`;

const HeroIcon = styled.div`
  position: relative;
  width: fit-content;
  
  img {
    width: 100px;
    &[data-ispick="false"] {
      filter: grayscale(100%);
    }
  }

  .ban {
    position: absolute;
    z-index: 1;
    left: -8px;
    right: -8px;
    top: 28px;
    border-top: 2px solid ${constants.colorDanger};
    transform: rotate(-28deg);
  
    @media only screen and (max-width: 716px) {
      transform: rotate(-34deg);
      top: 13px;
    }
  }
`;

const LeftArrow = styled(Prev)`
  visibility: ${props => (props.visible === 'true' ? 'visible' : 'hidden')};
`;

const RightArrow = styled(Next)`
  visibility: ${props => (props.visible === 'true' ? 'visible' : 'hidden')};
`;

const TimeTracker = ({ pb, extraTime, isCaptains }) => (
  <div className="time-tracker">
    <span className="taken">
      <span className={pb.total_time_taken > 30 ? 'extra-used' : ''}>
        {pb.total_time_taken}s
      </span> used
    </span>
    {isCaptains &&
      <span className="left">
        {extraTime}s left
        {pb.total_time_taken > 30 &&
          <span className="extra-used">
            {` (-${pb.total_time_taken - 30}s)`}
          </span>
        }
      </span>
    }
  </div>
);
TimeTracker.propTypes = {
  pb: PropTypes.shape({}),
  extraTime: PropTypes.number,
  isCaptains: PropTypes.bool,
};

const DraftHero = ({
  pb, radiant, calcExtraTime, picks, isCaptains,
}) => (
  <DraftCell radiant={radiant}>
    <TimeTracker
      pb={pb}
      extraTime={calcExtraTime(true, pb.total_time_taken)}
      isCaptains={isCaptains}
    />
    <HeroIcon radiant={radiant}>
      <img
        src={heroes[pb.hero_id] && process.env.REACT_APP_API_HOST + heroes[pb.hero_id].img}
        alt=""
        data-ispick={picks.includes(pb.order)}
      />
      {!picks.includes(pb.order) && <div className="ban" />}
    </HeroIcon>
  </DraftCell>
);
DraftHero.propTypes = {
  pb: PropTypes.shape({}),
  radiant: PropTypes.bool,
  calcExtraTime: PropTypes.func,
  picks: PropTypes.arrayOf(PropTypes.number),
  isCaptains: PropTypes.bool,
};

// one-based indexing (since draft[i].order starts at 1)
const orderOne = [1, 3, 5, 7, 10, 12, 14, 16, 18, 20, 21];
const orderTwo = [2, 4, 6, 8, 9, 11, 13, 15, 17, 19, 22];
const picks = [7, 8, 9, 10, 15, 16, 17, 18, 21, 22];

const Draft = ({
  gameMode,
  radiantTeam = {},
  direTeam = {},
  draft = [],
}) => {
  // if there is no draft data there is no meaning to firstIsTeamTwo
  const firstIsTeamTwo = draft && draft[0] && draft[0].active_team === 2;
  const radiantOrder = firstIsTeamTwo ? orderTwo : orderOne;
  const radiantPick = pb => (radiantOrder.includes(pb.order));
  let radiantTimeLeft = 130;
  let direTimeLeft = 130;
  const calcExtraTime = (isRadiantTeam, timeTaken) => {
    if (isRadiantTeam) {
      if (timeTaken > 30) radiantTimeLeft -= (timeTaken - 30);
      return radiantTimeLeft;
    }
    if (timeTaken > 30) direTimeLeft -= (timeTaken - 30);
    return direTimeLeft;
  };

  return (
    <Styled>
      <section className="teams">
        <Heading
          title={`${getTeamName(radiantTeam, true)}`}
          icon={<IconRadiant />}
        />
        <Heading
          title={`${getTeamName(direTeam, false)}`}
          icon={<IconDire />}
        />
      </section>
      <Table selectable={false}>
        <TableBody
          displayRowCheckbox={false}
          selectable={false}
          className="draft-table"
        >
          {gameMode === 2 ?
            draft.map(pb => (
              <TableRow
                key={pb.order}
                className={`${radiantOrder.includes(pb.order) ? 'radiant' : 'dire'} draft-row`}
              >
                <TableRowColumn style={{ paddingLeft: 0 }}>
                  {radiantPick(pb) &&
                    <DraftHero
                      pb={pb}
                      radiant={radiantPick(pb)}
                      calcExtraTime={calcExtraTime}
                      picks={picks}
                      isCaptains={gameMode === 2}
                    />
                  }
                </TableRowColumn>
                <TableRowColumn>
                  {picks.includes(pb.order) ?
                    <Pick>
                      <LeftArrow style={{ color: 'inherit' }} visible={radiantPick(pb) ? 'true' : 'false'} />
                      Pick {pb.order}
                      <RightArrow style={{ color: 'inherit' }} visible={radiantPick(pb) ? 'false' : 'true'} />
                    </Pick> :
                    <Ban>
                      <LeftArrow style={{ color: 'inherit' }} visible={radiantPick(pb) ? 'true' : 'false'} />
                      Ban {pb.order}
                      <RightArrow style={{ color: 'inherit' }} visible={radiantPick(pb) ? 'false' : 'true'} />
                    </Ban>
                  }
                </TableRowColumn>
                <TableRowColumn style={{ paddingRight: 0 }}>
                  {!radiantPick(pb) &&
                    <DraftHero
                      pb={pb}
                      radiant={radiantPick(pb)}
                      calcExtraTime={calcExtraTime}
                      picks={picks}
                      isCaptains={gameMode === 2}
                    />
                  }
                </TableRowColumn>
              </TableRow>
            )) :
            draft.sort((a, b) => a.total_time_taken - b.total_time_taken).map(pb => (
              <TableRow
                key={pb.order}
                className={`${radiantOrder.includes(pb.order) ? 'radiant' : 'dire'} draft-row`}
              >
                <TableRowColumn style={{ paddingLeft: 0 }}>
                  {radiantPick(pb) &&
                    <DraftHero
                      pb={pb}
                      radiant={radiantPick(pb)}
                      calcExtraTime={calcExtraTime}
                      picks={picks}
                      isCaptains={gameMode === 2}
                    />
                  }
                </TableRowColumn>
                <TableRowColumn style={{ paddingRight: 0 }}>
                  {!radiantPick(pb) &&
                    <DraftHero
                      pb={pb}
                      radiant={radiantPick(pb)}
                      calcExtraTime={calcExtraTime}
                      picks={picks}
                      isCaptains={gameMode === 2}
                    />
                  }
                </TableRowColumn>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </Styled>
  );
};

Draft.propTypes = {
  gameMode: PropTypes.number,
  radiantTeam: PropTypes.shape({}),
  direTeam: PropTypes.shape({}),
  draft: PropTypes.arrayOf(PropTypes.shape({})),
};

export default Draft;
