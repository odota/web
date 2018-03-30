import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import items from 'dotaconstants/build/items.json';
import { threshold, formatSeconds } from 'utility';
import Table from '../components/Table';
import strings from 'lang';
import Heading from '../components/Heading';
import { heroTd, heroTdColumn } from '../matchColumns';
import constants from '../../constants';
import LogHover from './LogHover';

const Styled = styled.div`
.placement{ 
  display: none;
  }
  .minimap:hover .placement{
  position: absolute;
  display : block;
  padding-left: 30px;
  pointer-events: none
  }
`;

const durationObserverColor = threshold(0, [121, 241, 371], [constants.colorRed, constants.colorYelor, constants.colorGreen]);
const durationSentryColor = threshold(0, [81, 161, 251], [constants.colorRed, constants.colorYelor, constants.colorGreen]);

const columns = [
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
  },
  {
    center: true,
    displayName: strings.ward_log_left_at,
    field: 'left_time',
  },
  {
    center: true,
    displayName: strings.ward_log_duration,
    field: 'duration',
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


function logWard(log) {
  return (
    <Styled>
      <div className="minimap"><img
        src="/assets/images/dota2/map/minimap2.jpg"
        style={{ height: '30px' }}
        alt=""
      /><div className="placement">{LogHover(log)}</div>
      </div>

    </Styled>
  );
}

const generateData = match => (log) => {
  const wardKiller = (log.left && log.left.player1) ? heroTd(match.players[log.left.player1]) : '';
  const duration = (log.left && log.left.time - log.entered.time) || (match && match.duration - log.entered.time);

  // necessary until https://github.com/odota/parser/pull/3 is implemented
  const discrepancy = duration - Math.min(items[`ward_${log.type}`].attrib.find(x => x.key === 'lifetime').value, duration);

  const durationColor = log.type === 'observer' ? durationObserverColor(duration) : durationSentryColor(duration);

  return {
    ...match.players[log.player],
    type: <img height="29" src={`${process.env.REACT_APP_API_HOST}/apps/dota2/images/items/ward_${log.type}_lg.png`} alt="" />,
    enter_time: formatSeconds(log.entered.time),
    left_time: formatSeconds(((log.left && log.left.time) || (match && match.duration)) - discrepancy) || '-',
    duration: <span style={{ color: durationColor }}>{formatSeconds(duration - discrepancy)}</span>,
    killer: wardKiller,
    placement: logWard(log),
  };
};

const VisionLog = ({ match, wards }) => (
  <div>
    <Heading title={strings.vision_ward_log} />
    <Table data={wards.map(generateData(match))} columns={columns} />
  </div>
);

VisionLog.propTypes = {
  match: PropTypes.shape({}),
  wards: PropTypes.arrayOf({}),
};

export default VisionLog;
