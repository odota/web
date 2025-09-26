const reduceArray = (backwards: boolean) => (array: any[], val: any) => {
  if (array.length !== 0 || val.games !== 0) {
    if (backwards) {
      array.unshift(val);
    } else {
      array.push(val);
    }
  }
  return array;
};

export default function transformHistograms(data: any[]) {
  return data.reduceRight(reduceArray(true), []);
}
