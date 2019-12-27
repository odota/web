const reduceArray = backwards => (array, val) => {
  if (array.length !== 0 || val.games !== 0) {
    if (backwards) {
      array.unshift(val);
    } else {
      array.push(val);
    }
  }
  return array;
};

export default function transformHistograms(data) {
  return data.reduceRight(reduceArray(true), []);
}
