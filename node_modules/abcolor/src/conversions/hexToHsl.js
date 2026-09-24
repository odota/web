import hexToRgb from './hexToRgb';
import rgbToHsl from './rgbToHsl';

export default (hexadecimal, css = false) => rgbToHsl(
  hexToRgb(hexadecimal), css === true && true
);
