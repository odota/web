const reduceArray = (backwards, xIsTime) => (array, val) => {
  if (array.length !== 0 || val.games !== 0) {
    const value = xIsTime ? { ...val, x: (val.x / 60).toFixed(1) } : val;
    if (backwards) {
      array.unshift(value);
    } else {
      array.push(value);
    }
  }
  return array;
};

const transformHistograms = xIsTime => data => data.reduceRight(reduceArray(true, xIsTime), []);

export default transformHistograms;
