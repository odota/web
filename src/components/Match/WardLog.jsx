import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import { isRadiant, formatSeconds } from 'utility';
import { Row, Col } from 'react-flexbox-grid';
// import heroes from 'dotaconstants/json/heroes.json';
import { heroTd } from './matchColumns';
import { API_HOST } from 'config';
import { TransitionMotion, spring, presets } from 'react-motion';
import { Fixed, Pure } from 'utility/components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './Match.css';

import strings from 'lang';
import _ from 'lodash/fp';

const extractTransitionClasses = (name, styles) => ({
  enter: styles[name + '-enter'],
  enterActive: styles[name + '-enter-active'],
  leave: styles[name + '-leave'],
  leaveActive: styles[name + '-leave-active'],
  appear: styles[name + '-appear'],
  appearActive: styles[name + '-appear-active']
})

// a simple functor that will call the correct function depending on value 
const threshold = _.curry((start, limits, values, value) => {
  if (limits.length != values.length) throw "Limits must be the same as functions.";
  var limits = limits.slice(0);
  limits.unshift(start);
  return _.findLast(values, (v, i) => _.inRange(value, limits[i], limits[i+1]));
});

// const durationSentryColor = threshold(0, [121, 120, 500], ['red', 'yellow', 'green']);
const durationObserverColor = threshold(0, [121, 241, 500], ['red', 'yellow', 'green']);

const RowItem = ({ style, row, match, index }) => {
  const wardKiller = (row.left && row.left.player1) ? heroTd(match.players[row.left.player1]) : "-";
  const duration = row.left ? formatSeconds(row.left.time - row.entered.time) : "-";
  return (
    <li>
      <Row className={styles['ward-log-item']} style={style} middle="xs">
        <Col md={1}>
          <img height="29" src={`${API_HOST}/apps/dota2/images/items/ward_${row.type}_lg.png`} role="presentation" />
        </Col>
        <Col md>
          {heroTd(match.players[row.player])}
        </Col>
        <Col md={1} className={styles.timespan}>{formatSeconds(row.entered.time)}</Col>
        <Col md={1} className={styles.timespan}>{formatSeconds(row.left && row.left.time) || "-"}</Col>
        <Col md={1} className={styles.timespan}>
          <span>{duration}</span>
        </Col>
        <Col md>{wardKiller}</Col>
      </Row>
    </li>
  );
}
const PureRowItem = Fixed(RowItem);

class WardLog extends React.Component {
  getDefaultStyles() {
    return this.props.wardsLog.map((row, i) => (
      {
        data: row,
        key: String(row.key || i),
        style: {height: 0}
      }));
  }

  getStyles() {
    return this.props.wardsLog.map((row, i) => (
      {
        data: row,
        key: String(row.key || i),
        style: {
          height: spring(50, presets.stiff),
        }
      }
    ));    
  }

  willEnter() {
    return {
      height: 0,
    };
  }

  willLeave() {
    return {
      height: spring(0),
    };
  }
  
  render() {
    const width = this.props.width;
    const iconSize = width / 12;
    const style = ward => ({
      position: 'absolute',
      top: ((width / 127) * ward.y) - (iconSize / 2),
      left: ((width / 127) * ward.x) - (iconSize / 2),
    });
    const obsIcons = [];
    const senIcons = [];
    return (
      <Col xs>
        <ReactCSSTransitionGroup className={styles['ward-log']} style={{width: '100%'}} component="ul"
                                 transitionName={extractTransitionClasses("trans-table-row", styles)}
                                 transitionEnterTimeout={300}
                                 transitionLeaveTimeout={300}
                                 
        >
          {this.props.wardsLog.map((log, index) =>
            <PureRowItem key={log.key} row={log} match={this.props.match} index={index} />
           )}
        </ReactCSSTransitionGroup>
      </Col>
    );
  }
}

// TODO use defaultprops and export directly
export default function ({
  match,
  wardsLog,
  width = 600,
}) {
  return <WardLog match={match} wardsLog={wardsLog} width={width} />;
}
