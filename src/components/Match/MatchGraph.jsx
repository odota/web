import React, {
  Component,
} from 'react';
import uuid from 'node-uuid';
import c3 from 'c3';
import {
  formatSeconds,
  getLevelFromXp,
} from 'utility';
import strings from 'lang';
import Heading from 'components/Heading';
import styles from './Match.css';

const playerColors = {
  0: '#2E6AE6',
  1: '#5DE6AD',
  2: '#AD00AD',
  3: '#DCD90A',
  4: '#E66200',
  128: '#E67AB0',
  129: '#92A440',
  130: '#5CC5E0',
  131: '#00771F',
  132: '#956000',
};
const colorArray = Object.keys(playerColors).map(k => playerColors[k]);

const drawGraphs = (props, id) => {
  if (props.match && props.match.graphData) {
    const data = props.match.graphData[props.type];
    const color = props.type === 'difference' ? null : {
      pattern: colorArray,
    };
    const type = props.type === 'difference' ? 'area-spline' : 'spline';
    const valueFormat = props.type === 'xp' ? xp => `${xp} - ${strings.th_level} ${getLevelFromXp(xp)}` : undefined;
    c3.generate({
      bindto: `#${id}`,
      data: {
        x: 'time',
        columns: data,
        type,
      },
      color,
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format(x) {
              return formatSeconds(x);
            },
          },
          label: 'Time',
        },
        y: {
          label: props.type,
        },
      },
      zoom: {
        enabled: true,
        rescale: true,
      },
      tooltip: {
        contents(d, defaultTitleFormat, defaultValueFormat, color) {
          d.sort((a, b) => b.value - a.value);
          return this.getTooltipContent(d, defaultTitleFormat, valueFormat || defaultValueFormat, color);
        },
      },
    });
  }
};

class MatchGraph extends Component {
  componentWillMount() {
    this.id = `a-${uuid.v4()}`;
  }
  componentDidMount() {
    drawGraphs(this.props, this.id);
  }
  componentWillUpdate(nextProps) {
    drawGraphs(nextProps, this.id);
  }

  render() {
    return (<div>
      <Heading title={strings[`heading_graph_${this.props.type}`]} />
      <div className={styles.matchGraph} id={this.id} />
    </div>);
  }
}

export default MatchGraph;
