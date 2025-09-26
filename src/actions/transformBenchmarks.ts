export default function transformBenchmarks(data: any) {
  const { result } = data;
  const listStats = Object.keys(data.result);
  const listPercentiles = result[listStats[0]].map((i: any) => i.percentile);
  const benchmarks = [];

  for (let i = 0; i < listPercentiles.length; i += 1) {
    const percentilePerStat: Record<string, number> = {
      percentile: listPercentiles[i],
    };

    listStats.forEach((stat) => {
      percentilePerStat[stat] = result[stat][i].value;
    });
    benchmarks.push(percentilePerStat);
  }
  return { result: benchmarks };
}
