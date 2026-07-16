import {
  hashChar,
  aHex,
  formatRgb
} from '../utility';

export default (hexadecimal, percent = false, css = false) => {
  if (hexadecimal) {
    // Remove hash char
    let hex = hashChar(hexadecimal);

    if (aHex(hex)) {
      if (percent === null || typeof percent === 'boolean') {
        // Convert 3-char hex into a 6-char
        if (hex.length === 3) {
          hex = [...hex]
            .map(c => c.repeat(2))
            .join('');
        }

        const bigint = parseInt(hex, 16);
        let rgb = [
          (bigint >> 16) & 255, // R
          (bigint >> 8) & 255, // G
          bigint & 255 // B
        ];

        // Convert decimal into percent
        if (percent === true) {
          rgb = rgb.map(val =>
            Number(((val * 100) / 255).toFixed(percent ? 2 : 0))
          );
        }

        // CSS formatting
        if (css === true) {
          if (percent === true) {
            rgb = formatRgb(rgb, true);
          } else {
            rgb = formatRgb(rgb);
          }
        }

        return rgb;
      }

      throw new Error('Percent must be boolean');
    }

    throw new Error('Hex must be a string or number');
  }
  throw new Error('Something wrong with given hex value');
};
