const buckets = 40;

export default (columns, xVals, histogramName) => {
  if (columns.length <= buckets) {
    return {
      [histogramName]: columns,
      x: xVals,
    };
  }
  const max = Math.max(...xVals);
  const bucketSize = ~~(max / buckets);
  const newXVals = [];
  let i = 0;
  for (i; i < buckets; i++) {
    newXVals.push(bucketSize * i);
  }
  i = 0;
  const newColumns = newXVals.map((val) => {
    const newObj = { win: 0, games: 0 };
    let enteredLoop = false;
    while (i < xVals.length && xVals[i] <= val) {
      newObj.win += columns[i].win;
      newObj.games += columns[i].games;
      i++;
      enteredLoop = true;
    }
    if (!enteredLoop) {
      i++;
    } else {
      enteredLoop = false;
    }
    return newObj;
  });
  const removedIndices = [];
  const filteredCols = newColumns.filter((obj, index) => {
    const hasNoData = obj.games === 0;
    if (hasNoData) {
      removedIndices.push(index);
    }
    return !hasNoData;
  });

  return {
    [histogramName]: filteredCols,
    x: newXVals.filter((val, index) => !removedIndices.includes(index)),
  };
};
