import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { threshold, formatSeconds } from '../../../utility';
import Table from '../../Table';
import Heading from '../../Heading';
import mcs from '../matchColumns';
import constants from '../../constants';
import LogHover from './LogHover';
import config from '../../../config';

const Styled = styled.div`
  display: inline-block;

  .minimap {
  } 

  .minimap:hover > img {
    border: 1px solid ${constants.colorMutedLight};
  }

  .placement {
    position: absolute;
    transform: scale(0);
    transition: .1s ease;
    pointer-events: none;
    filter: brightness(110%);
  }

  .minimap:hover .placement {
    transform: scale(1)
  }
`;

const durationObserverColor = threshold(0, [121, 241, 371], [constants.colorRed, constants.colorYelor, constants.colorGreen]);
const durationSentryColor = threshold(0, [81, 161, 251], [constants.colorRed, constants.colorYelor, constants.colorGreen]);

const columns = (strings) => {
  const { heroTdColumn } = mcs(strings);
  return [
    {
      displayName: strings.ward_log_type,
      field: 'type',
    },
    {
      ...heroTdColumn,
      displayName: strings.ward_log_owner,
      sortFn: false,
    },
    {
      center: true,
      displayName: strings.ward_log_entered_at,
      field: 'enter_time',
      textAlign: 'center',
    },
    {
      center: true,
      displayName: strings.ward_log_left_at,
      field: 'left_time',
      textAlign: 'center',
    },
    {
      center: true,
      displayName: strings.ward_log_duration,
      field: 'duration',
      textAlign: 'center',
    },
    {
      displayName: strings.ward_log_killed_by,
      field: 'killer',
    },
    {
      displayName: strings.placement,
      field: 'placement',
    },
  ];
};


function logWard(log, startTime) {
  return (
    <Styled>
      <div className="minimap"><img
        src="/assets/images/dota2/map/minimap2.jpg"
        style={{ height: '30px' }}
        alt="Minimap"
      /><div className="placement">{LogHover(log, startTime)}</div>
      </div>

    </Styled>
  );
}

const generateData = (match, strings) => (log) => {
  const { heroTd } = mcs(strings);

  const duration = (log.left && log.left.time - log.entered.time) || (match && match.duration - log.entered.time);

  // necessary until https://github.com/odota/parser/pull/3 is implemented
  const lifetime = log.type === 'observer' ? 360 : 420;
  const discrepancy = duration - Math.min(lifetime, duration);

  const durationColor = log.type === 'observer' ? durationObserverColor(duration) : durationSentryColor(duration);

  const wardKiller = match.players.find(p => log.left && p.hero_name === log.left.attackername);

  return {
    ...match.players[log.player],
    type: <img height="29" src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/dota_react/items/ward_${log.type}.png`} alt="" />,
    enter_time: formatSeconds(log.entered.time),
    left_time: formatSeconds(((log.left && log.left.time) || (match && match.duration)) - discrepancy) || '-',
    duration: <span style={{ color: durationColor }}>{formatSeconds(duration - discrepancy)}</span>,
    killer: wardKiller && heroTd(wardKiller),
    placement: logWard(log, match.start_time),
  };
};

const VisionLog = ({ match, wards, strings }) => (
  <div>
    <Heading title={strings.vision_ward_log} />
    <Table data={wards.map(generateData(match, strings))} columns={columns(strings)} />
  </div>
);

VisionLog.propTypes = {
  match: PropTypes.shape({}),
  wards: PropTypes.arrayOf({}),
  strings: PropTypes.shape({}),
};

export default VisionLog;
