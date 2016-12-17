import React from 'react';
import { threshold, formatSeconds, extractTransitionClasses } from 'utility';
import { Row, Col } from 'react-flexbox-grid';
// import heroes from 'dotaconstants/json/heroes.json';
import fixed from 'utility/components/Fixed';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import strings from 'lang';

import { heroTd } from '../matchColumns';
import styles from './Vision.css';


const durationObserverColor = threshold(0, [121, 241, 370], [styles.red, styles.yelor, styles.green]);
const durationSentryColor = threshold(0, [81, 161, 250], [styles.red, styles.yelor, styles.green]);

const RowItem = ({ style, log, match }) => {
  const wardKiller = (log.left && log.left.player1) ? heroTd(match.players[log.left.player1]) : '';
  const duration = log.left ? log.left.time - log.entered.time : '';

  const durationColor = log.type === 'observer' ? durationObserverColor(duration) : durationSentryColor(duration);

  const rowStyle = { ...style,
    backgroundColor: log.key % 2 === 0 ? styles.wardLogRowEvenSurfaceColor : styles.wardLogRowOddSurfaceColor,
  };

  return (
    <li>
      <Row className={styles.wardLogItem} style={rowStyle} middle="xs">
        <Col xs={1}>
          <img height="29" src={`${API_HOST}/apps/dota2/images/items/ward_${log.type}_lg.png`} role="presentation" />
        </Col>
        <Col xs={4}>
          {heroTd(match.players[log.player])}
        </Col>
        <Col xs={1} className={styles.timespan}>{formatSeconds(log.entered.time)}</Col>
        <Col xs={1} className={styles.timespan}>{formatSeconds(log.left && log.left.time) || '-'}</Col>
        <Col xs={1} className={styles.timespan} style={{ color: durationColor }}>{formatSeconds(duration)}</Col>
        <Col xs={4} style={{ paddingLeft: '38px' }}>{wardKiller}</Col>
      </Row>
    </li>
  );
};

const PureRowItem = fixed(RowItem);

// i18n column names
const columns = ['type', 'owner', 'entered_at', 'left_at', 'duration', 'killed_by'].map(h => `ward_log_${h}`);

const WardLog = (props) => {
  const transition = extractTransitionClasses(styles);

  return (
    <div className={styles.wardLog}>
      <Row className={styles.wardLogHeader} middle="xs">
        <Col xs={1}>{strings[columns[0]]}</Col>
        <Col xs={4}>{strings[columns[1]]}</Col>
        <Col className={styles.timespan} xs={1}>{strings[columns[2]]}</Col>
        <Col className={styles.timespan} xs={1}>{strings[columns[3]]}</Col>
        <Col className={styles.timespan} xs={1}>{strings[columns[4]]}</Col>
        <Col xs={4} style={{ paddingLeft: '38px' }}>{strings[columns[5]]}</Col>
      </Row>
      <ReactCSSTransitionGroup
        className={styles.wardLogList}
        style={{ width: '100%' }}
        component="ul"
        transitionName={transition('trans-table-row')}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        {props.wards.map((log, index) =>
          <PureRowItem key={log.key} log={log} match={props.match} index={index} />,
        )}
      </ReactCSSTransitionGroup>
    </div>
  );
};


// TODO use defaultprops and export directly
export default function ({
  match,
  wards,
  width = 600,
}) {
  return <WardLog match={match} wards={wards} width={width} />;
}
