import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import {
  isRadiant,
  // transformations,
} from 'utility';
import { PlainTable as Table } from 'components/Table';
import {
  Row,
  Col,
} from 'react-flexbox-grid';
// import heroes from 'dotaconstants/json/heroes.json';
import strings from 'lang';
import {
  heroTd,
} from './matchColumns';
import { API_HOST } from 'config';
import _ from 'lodash/fp';

// remove this when done
import {
  Table as MaterialTable,
  TableBody as MaterialTableBody,
  TableHeader as MaterialTableHeader,
  TableRow as MaterialTableRow,
  TableRowColumn as MaterialTableRowColumn,
} from 'material-ui/Table';


const obsWard = (style, stroke, iconSize) => (<svg style={style} width={iconSize} height={iconSize} xmlns="http://www.w3.org/2000/svg">
  <g>
    <title>Observer</title>
    <circle fill="#ffff00" strokeWidth="5" stroke={stroke} r={iconSize * 0.4} cy={iconSize / 2} cx={iconSize / 2} fillOpacity="0.4" />
  </g>
  <defs>
    <filter id="_blur">
      <feGaussianBlur stdDeviation="0.1" in="SourceGraphic" />
    </filter>
  </defs>
</svg>);

const senWard = (style, stroke, iconSize) => (<svg style={style} width={iconSize} height={iconSize} xmlns="http://www.w3.org/2000/svg">
  <g>
    <title>Sentry</title>
    <circle fill="#0000ff" strokeWidth="5" stroke={stroke} r={iconSize * 0.4} cy={iconSize / 2} cx={iconSize / 2} fillOpacity="0.4" />
  </g>
  <defs>
    <filter id="_blur">
      <feGaussianBlur stdDeviation="0.1" in="SourceGraphic" />
    </filter>
  </defs>
</svg>);

// a simple functor that will call the correct function depending on value 
const threshold = _.curry((start, limits, values, value) => {
  if (limits.length != values.length) throw "Limits must be the same as functions.";
  var limits = limits.slice(0);
  limits.unshift(start);
  return _.findLast(values, (v, i) => _.inRange(value, limits[i], limits[i+1]));
});

// const durationSentryColor = threshold(0, [121, 120, 500], ['red', 'yellow', 'green']);
const durationObserverColor = threshold(0, [121, 241, 500], ['red', 'yellow', 'green']);

// TODO Hero icon on ward circles?
class WardLog extends React.Component {
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
      <Row>
	<Table
          data={this.props.wardsLog}
          columns={[
	    {
	      displayName: "Type",
	      field: 'type',
	      displayFn: (row, col, field) => <img height="29" src={`${API_HOST}/apps/dota2/images/items/ward_${field}_lg.png`} role="presentation" />
	    }, {
	      displayName: "Player",
	      displayFn: (row) => heroTd(this.props.match.players[row.player]),
	    },{
              displayName: strings.th_ward_observer,
              field: 'entered',
              displayFn: (row, col, field) => field.time,
            }, {
              displayName: "Left",
              field: 'left',
              displayFn: (row, col, field) => (field && field.time) || "-",
	    }, {
	      displayName: strings.th_ward_log_duration || "Duration (s)",
	      displayFn: (row) => {
	        if (!row.left) return "-";
	        const duration = row.left.time - row.entered.time;
		const style = { color: row.type == "sentry" ? 'white' : durationObserverColor(duration) };
	        return <span style={style}>{duration}</span>
	      },
	    }, {
	      displayName: strings.th_ward_log_killed_by || "Killed by",
	      displayFn: (row) => {
	        if (!row.left || !row.left.player1) return "-"; 
	        return heroTd(this.props.match.players[row.left.player1]);
	      }
	    }
          ]}
        />
      </Row>
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
