import React from "react";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import { gameCoordToUV, formatSeconds, getWardSize } from "../../../utility";
import PlayerThumb from "../PlayerThumb/PlayerThumb";
import DotaMap from "../../DotaMap/DotaMap";
import constants from "../../constants";
import useStrings from "../../../hooks/useStrings.hook";

const Styled = styled.div`
  .tooltipContainer {
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: 10px;
    margin: -8px -12px;

    & > * {
      margin: 0 5px;

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }
    }

    & > div {
      margin: 0;
      color: ${constants.colorMutedLight};
    }
  }

  .radiantWardTooltip {
    border-width: 2px !important;
    border-color: ${constants.colorSuccess} !important;
  }

  .direWardTooltip {
    border-width: 2px !important;
    border-color: ${constants.colorDanger} !important;
  }

  div > img {
    width: 18px;
  }
`;

const wardStyle = (width: number, log: any): React.CSSProperties => {
  const gamePos = gameCoordToUV(log.entered.x, log.entered.y);
  const stroke =
    log.entered.player_slot < 5 ? constants.colorGreen : constants.colorRed;

  let fill;
  let strokeWidth;

  const wardSize = getWardSize(log.type, width);

  if (log.type === "observer") {
    fill = constants.colorYelorMuted;
    strokeWidth = 2.5;
  } else {
    fill = constants.colorBlueMuted;
    strokeWidth = 2;
  }

  return {
    position: "absolute",
    width: wardSize,
    height: wardSize,
    top: (width / 127) * gamePos.y - wardSize / 2,
    left: (width / 127) * gamePos.x - wardSize / 2,
    background: fill,
    borderRadius: "50%",
    border: `${strokeWidth}px solid ${stroke}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
};

const wardIcon = (log: any) => {
  const side = log.entered.player_slot < 5 ? "goodguys" : "badguys";
  return `/assets/images/dota2/map/${side}_${log.type}.png`;
};

const WardTooltipEnter = ({
  player,
  log,
}: {
  player: MatchPlayer;
  log: any;
}) => {
  const strings = useStrings();
  return (
    <div className="tooltipContainer">
      <PlayerThumb {...player} />
      <div>
        {log.type === "observer"
          ? strings.vision_placed_observer
          : strings.vision_placed_sentry}
      </div>
      <div>{` ${formatSeconds(log.entered.time)}`}</div>
    </div>
  );
};

const WardTooltipLeft = ({ log }: { log: any }) => {
  const strings = useStrings();
  let expired;
  const age = log.left.time - log.entered.time;

  if (log.type === "observer") {
    expired = age > 360;
  } else {
    expired = age > 240;
  }

  return (
    <div className="tooltipContainer">
      <div>{expired ? strings.vision_expired : strings.vision_destroyed}</div>
      <div>{` ${formatSeconds(age)}`}</div>
    </div>
  );
};

const WardPin = ({
  match,
  width,
  log,
}: {
  match: Match;
  width: number;
  log: any;
}) => {
  const strings = useStrings();
  const id = `ward-${log.entered.player_slot}-${log.entered.time}`;
  const sideName = log.entered.player_slot < 5 ? "radiant" : "dire";

  return (
    <Styled>
      <div style={wardStyle(width, log)} data-tip data-for={id}>
        <img src={wardIcon(log)} alt={log.type === "observer" ? "O" : "S"} />
      </div>
      <ReactTooltip
        id={id}
        effect="solid"
        border
        class={`${sideName}WardTooltip`}
      >
        <WardTooltipEnter player={match.players[log.player]} log={log} />
        {log.left && <WardTooltipLeft log={log} />}
      </ReactTooltip>
    </Styled>
  );
};

type VisionMapProps = {
  match: Match;
  wards: any[];
};

class VisionMap extends React.Component<VisionMapProps> {
  static defaultProps = {
    width: 400,
  };

  shouldComponentUpdate(newProps: VisionMapProps) {
    return newProps.wards.length !== this.props.wards.length;
  }

  render() {
    const width = 550;
    return (
      <div style={{ height: width }}>
        <DotaMap
          startTime={this.props.match.start_time}
          maxWidth={width}
          width={width}
        >
          {this.props.wards.map((w) => (
            <WardPin
              match={this.props.match}
              key={w.key}
              width={width}
              log={w}
            />
          ))}
        </DotaMap>
      </div>
    );
  }
}

export default VisionMap;
