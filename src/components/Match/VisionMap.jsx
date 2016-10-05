import React from 'react';
// import Checkbox from 'material-ui/Checkbox';

const obsWard = (style, iconSize) => (<svg style={style} width={iconSize} height={iconSize} xmlns="http://www.w3.org/2000/svg">
  <g>
    <title>Observer</title>
    <circle fill="#ffff00" strokeWidth="5" stroke="orange" r={iconSize * 0.4} cy={iconSize / 2 } cx={iconSize / 2} fillOpacity="0.4" />
  </g>
  <defs>
    <filter id="_blur">
      <feGaussianBlur stdDeviation="0.1" in="SourceGraphic" />
    </filter>
  </defs>
</svg>);

const senWard = (style, iconSize) => (<svg style={style} width={iconSize} height={iconSize} xmlns="http://www.w3.org/2000/svg">
  <g>
    <title>Sentry</title>
    <circle fill="#0000ff" strokeWidth="5" stroke="cyan" r={iconSize * 0.4} cy={iconSize / 2 } cx={iconSize / 2} fillOpacity="0.4" />
  </g>
  <defs>
    <filter id="_blur">
      <feGaussianBlur stdDeviation="0.1" in="SourceGraphic" />
    </filter>
  </defs>
</svg>);

export default function VisionMap({
  match,
  width = 500,
}) {
  // TODO player selector element
  // TODO Hero icon on ward circles?

  const obs = (match && match.players && match.players[4] && match.players[4].posData && match.players[4].posData.obs) || [];
  const obsIcons = obs.map((ward) => {
    const style = {
      position: 'absolute',
      top: ((width / 127) * ward.y) - (width / 12),
      left: ((width / 127) * ward.x) - (width / 12),
    };
    const iconSize = width / 6;
    return obsWard(style, iconSize);
  });
  const sen = (match && match.players && match.players[4] && match.players[4].posData && match.players[4].posData.sen) || [];
  const senIcons = sen.map((ward) => {
    const style = {
      position: 'absolute',
      top: ((width / 127) * ward.y) - (width / 12),
      left: ((width / 127) * ward.x) - (width / 12),
    };
    const iconSize = width / 6;
    return senWard(style, iconSize);
  });
  return (
    <div
        style={{
          position: 'relative',
          top: 0,
          left: 0,
          width,
        }}
      >
        <img width={width} src="/assets/images/map.png" role="presentation" />
        {obsIcons}
        {senIcons}
      </div>);
}
