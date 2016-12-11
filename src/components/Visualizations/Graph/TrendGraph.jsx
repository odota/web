import React from 'react';
import { Graph } from 'components/Visualizations';

// const getXAxis = columns => columns.length > 0 && ({ tick: { values: [columns[0].x, columns[columns.length - 1].x] } });

const TrendGraph = ({ columns, name }) => (
  <Graph
    type="spline"
    columns={columns}
    name={name}
    color="#66bbff"
    hidePoints
    yAxis={{
      tick: {
          format: (d) => Number(d.toFixed(2))
      }
    }}
  />
);

// TODO tooltips with match/hero details
/*
title: function(d){return moment.unix(avgs[d].start_time).format("dddd YYYY MMM DD");},
value: function(value, ratio, id, ind){
console.log(value, ratio, id, ind);
var table = document.createElement('table');
var tr1 = document.createElement('tr');
var td1 = document.createElement('td');
td1.innerHTML = "Hero";
var td2 = document.createElement('td');
td2.innerHTML = "Match";
var td3 = document.createElement('td');
td3.innerHTML = "Average";
tr1.appendChild(td1);
tr1.appendChild(td2);
tr1.appendChild(td3);
table.appendChild(tr1);
var tr2 = document.createElement('tr');
table.appendChild(tr2);
var hero = document.createElement('td');
var value = document.createElement('td');
var avg = document.createElement('td');
var img = document.createElement('img');
img.src = heroes[avgs[ind].hero_id].img;
img.class = "img-sm";
hero.innerHTML = img.outerHTML;
value.innerHTML = avgs[ind].val;
avg.innerHTML = avgs[ind].avg;
tr2.appendChild(hero);
tr2.appendChild(value);
tr2.appendChild(avg);
return table.outerHTML;
}
*/

TrendGraph.propTypes = {
  columns: React.PropTypes.arrayOf(),
};

export default TrendGraph;
