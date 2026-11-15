import React from "react";
import { gameCoordToUV, getWardSize } from "../../../utility";
import DotaMap from "../../DotaMap/DotaMap";
import constants from "../../constants";
import styles from "./LogHover.module.css";

const hoverMapStyle: React.CSSProperties = {
  height: 300,
  position: "absolute",
  bottom: "25px",
  left: "25px",
  border: "5px solid rgb(21, 23, 27)",
  outline: "1px solid #0E0E0E",
};

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

export const WardPin = ({ width, log }: { width: number; log: any }) => {
  const id = `ward-${log.entered.player_slot}-${log.entered.time}`;
  return (
    <div
      className={styles.wardPin}
      style={wardStyle(width, log)}
      data-tip
      data-for={id}
    >
      <img src={wardIcon(log)} alt={log.type === "observer" ? "O" : "S"} />
    </div>
  );
};

const LogHover = (ward: any, startTime: number) => (
  <div style={hoverMapStyle}>
    <DotaMap maxWidth={300} width={300} startTime={startTime}>
      <WardPin key={ward.key} width={300} log={ward} />
    </DotaMap>
  </div>
);

export default LogHover;
