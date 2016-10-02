import React, {
  Component
} from 'react';
import uuid from 'node-uuid';
import c3 from 'c3';
import {
  formatSeconds,
} from '../../utility';

const player_colors = {
  "0": "#2E6AE6",
  "1": "#5DE6AD",
  "2": "#AD00AD",
  "3": "#DCD90A",
  "4": "#E66200",
  "128": "#E67AB0",
  "129": "#92A440",
  "130": "#5CC5E0",
  "131": "#00771F",
  "132": "#956000"
};
const color_array = Object.keys(player_colors).map(k => player_colors[k]);

class MatchGraph extends Component {
  componentWillMount() {
    this.id = `a-${uuid.v4()}`;
  }
  componentWillUpdate(nextProps) {
    if (nextProps.match && nextProps.match.graphData) {
      const data = nextProps.match.graphData[nextProps.type];
      const color = nextProps.type === 'difference' ? null : {
        pattern: color_array
      };
      const type = nextProps.type === 'difference' ? 'area-spline' : 'spline';
      c3.generate({
        bindto: `#${this.id}`,
        data: {
          x: 'time',
          columns: data,
          type: type,
        },
        color: color,
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: function (x) {
                return formatSeconds(x);
              }
            },
            label: 'Time'
          },
          y: {
            label: nextProps.type
          }
        },
        zoom: {
          enabled: true,
          rescale: true,
        },
        tooltip: {
          contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
            d.sort(function (a, b) {
              return b.value - a.value;
            });
            return this.getTooltipContent(d, defaultTitleFormat, defaultValueFormat, color);
          }
        }
      });
    }
  }
  render() {
    // TODO headers
    return <div id={this.id} />;
  }
}

export default MatchGraph;