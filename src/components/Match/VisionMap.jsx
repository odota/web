import React from 'react';

export default function VisionMap({
  posData,
  width = 600,
}) {
  if (posData && posData.obs) {
    const icons = [];
    posData.obs.forEach(ward => {
      const style = {
        // TODO scale based on client width
        // d.style += 'zoom: ' + document.getElementById(map').clientWidth / 600 + ';';
        position: 'absolute',
        top: ((width / 127) * ward.y) - (width / 12),
        left: ((width / 127) * ward.x) - (width / 12),
      };
      const iconSize = width / 6;
      icons.push(<svg style={style} width={iconSize} height={iconSize} xmlns="http://www.w3.org/2000/svg">
        <g>
          <title>Layer 1</title>
          <circle fill="#ffff00" strokeWidth="5" stroke="orange" r="40" cy="50" cx="50" fillOpacity="0.4" />
        </g>
        <defs>
          <filter id="_blur">
            <feGaussianBlur stdDeviation="0.1" in="SourceGraphic" />
          </filter>
        </defs>
      </svg>);
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
        {icons}
      </div>);
  }
  return <div />;
}
