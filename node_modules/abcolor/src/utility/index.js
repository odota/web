export const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

export const hashChar = str => (str.charAt(0) === '#' ? str.slice(1) : str);

export const aHex = str => /^#?([0-9a-f]{3}){1,2}$/i.test(str);

// RGB, HSL, HSV(HSB) are consists of three numbers, Tri means three :)
export const aTri = arr => Array.isArray(arr)
  && arr.length === 3
  && arr.every(val => isNumeric(val));

export const lc = str => str.toLowerCase();

export const formatRgb = (arr, percent = false) => aTri(arr) && (
  percent === true
    ? `rgb(${arr.map(val => `${val}%`)})`
    : `rgb(${arr.join()})`
);

export const formatHsl = arr => aTri(arr) && `hsl(${
  arr.map((val, i) => (i > 0 ? `${val}%` : val))
})`;
