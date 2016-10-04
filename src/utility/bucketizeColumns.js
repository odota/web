const maxBuckets = 40;

// This function will bucketize a array of columns based on the length of the array
// and the max values of the x values list.
export default (columns, xVals, histogramName) => {
  if (columns.length <= maxBuckets) {
    return {
      [histogramName]: columns,
      x: xVals,
    };
  }
  const max = Math.max(...xVals);
  const bucketSize = Math.floor(max / maxBuckets);
  const newXVals = Array.from({
    length: maxBuckets,
  }, (value, index) => bucketSize * index);
  let i = 0;
  const newColumns = newXVals.map((val) => {
    const newObj = {
      win: 0,
      games: 0,
    };
    let enteredLoop = false;
    while (i < xVals.length && xVals[i] <= val) {
      newObj.win += columns[i].win;
      newObj.games += columns[i].games;
      i += 1;
      enteredLoop = true;
    }
    if (!enteredLoop) {
      i += 1;
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
