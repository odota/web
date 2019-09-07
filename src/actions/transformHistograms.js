const reduceArray = (backwards, xIsSeconds) => (array, val) => {
  if (array.length !== 0 || val.games !== 0) {
    const value = xIsSeconds ? { ...val, x: (val.x / 60).toFixed(1) } : val;
    if (backwards) {
      array.unshift(value);
    } else {
      array.push(value);
    }
  }
  return array;
};

const transformHistograms = xIsSeconds => data => data.reduceRight(reduceArray(true, xIsSeconds), []);

export default transformHistograms;
