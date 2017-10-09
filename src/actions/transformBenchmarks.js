export default function transformBenchmarks(data) {
  const { result } = data;
  const listStats = Object.keys(data.result);
  const listPercentiles = result[listStats[0]].map(i => i.percentile);
  const benchmarks = [];

  for (let i = 0; i < listPercentiles.length; i += 1) {
    const percentilePerStat = {
      percentile: listPercentiles[i],
    };

    listStats.forEach((stat) => {
      percentilePerStat[stat] = result[stat][i].value;
    });
    benchmarks.push(percentilePerStat);
  }
  return { result: benchmarks };
}
