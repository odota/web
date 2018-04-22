/*
export default function redrawGraphs(rows, field, yAxis) {
  const hasSum = rows[0] && rows[0].sum;
  const hasAvg = rows[0] && rows[0].avg;
  c3.generate({
    bindto: '#donut',
    data: {
      type: 'donut',
      columns: hasSum ? rows.map(row => [row[field], row.sum]) : [],
      empty: { label: { text: strings.explorer_chart_unavailable } },
    },
    donut: {
      title: hasSum ? `${strings.th_sum} - ${yAxis} - ${field}` : '',
    },
    legend: {
      show: false,
    },
  });
  rows.sort((a, b) => b.sum - a.sum);
  c3.generate({
    bindto: '#bar',
    data: {
      type: 'bar',
      columns: [
        hasSum ? [strings.th_sum].concat(rows.map(row => row.sum)) : null,
        hasAvg ? [strings.th_average].concat(rows.map(row => row.avg)) : null,
      ].filter(Boolean),
      empty: { label: { text: strings.explorer_chart_unavailable } },
    },
    axis: {
      x: {
        type: 'category',
        categories: rows.map(row => row[field]),
        tick: {
          // format: i => i,
        },
        label: field,
      },
      y: {
        label: yAxis,
      },
    },
    tooltip: {
      format: {
        // title: i => i,
      },
    },
  });
  rows.sort((a, b) => a[field] - b[field]);
  c3.generate({
    bindto: '#timeseries',
    data: {
      type: 'spline',
      columns: [
        hasAvg ? [strings.th_average].concat(rows.map(row => row.avg)) : null,
      ].filter(Boolean),
      empty: { label: { text: strings.explorer_chart_unavailable } },
    },
    axis: {
      x: {
        type: 'category',
        categories: rows.map(row => row[field]),
        label: field,
      },
      y: {
        label: yAxis,
      },
    },
  });
}
  */
