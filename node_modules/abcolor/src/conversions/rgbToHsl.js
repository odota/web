import {
  aTri,
  formatHsl
} from '../utility';

export default (rgb, css = false) => {
  if (rgb && aTri(rgb)) {
    // The R,G,B values are divided by 255 to change the range from 0..255 to 0..1
    const [r, g, b] = rgb.map(val => val / 255);

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;

    let h = 0;
    let s = 0;

    // Lightness calculation
    const l = (max + min) / 2;

    if (diff !== 0) {
      // Hue calculation
      switch (max) {
        case r:
          h = 60 * (((g - b) / diff) % 6);
          break;
        case g:
          h = 60 * (((b - r) / diff) + 2);
          break;
        default:
          h = 60 * (((r - g) / diff) + 4);
      }

      // Saturation calculation
      s = diff / (1 - Math.abs((2 * l) - 1));
    }

    const hsl = [
      h,
      s * 100,
      l * 100
    ].map(val => Number(val.toFixed(2)));

    return css === true ? formatHsl(hsl) : hsl;
  }

  throw new Error('Input must be an array of RGB decimals');
};
