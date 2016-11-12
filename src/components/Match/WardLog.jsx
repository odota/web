import React from 'react';
import { threshold, formatSeconds, extractTransitionClasses } from 'utility';
import { Row, Col } from 'react-flexbox-grid';
// import heroes from 'dotaconstants/json/heroes.json';
import { Fixed } from 'utility/components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import strings from 'lang';

import { heroTd } from './matchColumns';
import styles from './Match.css';


const durationObserverColor = threshold(0, [121, 241, 500], [styles.red, styles.yelor, styles.green]);

const RowItem = ({ style, row, match }) => {
  const wardKiller = (row.left && row.left.player1) ? heroTd(match.players[row.left.player1]) : '-';
  const duration = row.left ? row.left.time - row.entered.time : '-';
  const durationColor = row.type === 'observer' ? durationObserverColor(duration) : 'inherit';
  const rowStyle = { ...style,
    backgroundColor: row.key % 2 === 0
                   ? styles.wardLogRowEvenSurfaceColor
                   : styles.wardLogRowOddSurfaceColor,
  };
  return (
    <li>
      <Row component="li" className={styles['ward-log-item']} style={rowStyle} middle="xs">
        <Col xs={1}>
          <img height="29" src={`${API_HOST}/apps/dota2/images/items/ward_${row.type}_lg.png`} role="presentation" />
        </Col>
        <Col xs>
          {heroTd(match.players[row.player])}
        </Col>
        <Col xs={1} className={styles.timespan}>{formatSeconds(row.entered.time)}</Col>
        <Col xs={1} className={styles.timespan}>{formatSeconds(row.left && row.left.time) || '-'}</Col>
        <Col xs={1} className={styles.timespan} style={{ color: durationColor }}>{formatSeconds(duration)}</Col>
        <Col xs>{wardKiller}</Col>
      </Row>
    </li>
  );
};
const PureRowItem = Fixed(RowItem);

const WardLog = (props) => {
  const columns = ['type', 'owner', 'entered_at', 'left_at', 'duration', 'killed_by'].map(h => `ward_log_${h}`);
  const transition = extractTransitionClasses(styles);
  return (
    <Col className={styles['ward-log']} xs>
      <Row className={styles['ward-log-header']} middle="xs">
        <Col xs={1}>{strings[columns[0]]}</Col>
        <Col xs>{strings[columns[1]]}</Col>
        <Col className={styles.timespan} xs={1}>{strings[columns[2]]}</Col>
        <Col className={styles.timespan} xs={1}>{strings[columns[3]]}</Col>
        <Col className={styles.timespan} xs={1}>{strings[columns[4]]}</Col>
        <Col xs>{strings[columns[5]]}</Col>
      </Row>
      <ReactCSSTransitionGroup
        className={styles['ward-log-list']}
        style={{ width: '100%' }}
        component="ul"
        transitionName={transition('trans-table-row')}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        {props.wardsLog.map((log, index) =>
          <PureRowItem key={log.key} row={log} match={props.match} index={index} />,
         )}
      </ReactCSSTransitionGroup>
    </Col>
  );
};


// TODO use defaultprops and export directly
export default function ({
  match,
  wardsLog,
  width = 600,
}) {
  return <WardLog match={match} wardsLog={wardsLog} width={width} />;
}
