import {
  isNumeric,
  aHex,
  aTri,
  lc,
  formatRgb,
  formatHsl
} from './utility';
import colors from './colors';
import hexToRgb from './conversions/hexToRgb';
import rgbToHsl from './conversions/rgbToHsl';

const processСolor = (stage, options, o) => {
  let res = (stage === 'from' && colors.red[o.model]) || (stage === 'to' && colors.green[o.model]);

  if (options && options[stage]) {
    res = options[stage];

    if (aHex(res)) {
      res = hexToRgb(res);
    }
    if (aTri(res) && o.model === 'hsl') {
      res = rgbToHsl(res);
    }
  }

  return res;
};

export default (percent, options) => {
  if (percent !== undefined && percent >= 0 && percent <= 100 && isNumeric(percent)) {
    if (!options || typeof options === 'object') {
      const o = {};

      o.model = options && options.model
        && /^(rgb)$/.test(lc(options.model))
        ? lc(options.model)
        : 'hsl';

      o.from = processСolor('from', options, o);
      o.to = processСolor('to', options, o);

      o.css = options && options.css && options.css === true;

      const { from, to } = o;

      // Get color depends on given percent
      const diff = from.map((val, i) =>
        (Math.abs(to[i] - from[i]) * percent) / 100
      );
      const color = diff.map((val, i) =>
        Number((from[i] > to[i] ? from[i] - val : from[i] + val).toFixed(o.model === 'rgb' ? 0 : 2))
      );

      // Transform into css
      let result = color;

      if (o.css === true) {
        if (o.model === 'hsl') {
          result = formatHsl(color);
        } else if (o.model === 'rgb') {
          result = formatRgb(color);
        }
      }

      return result;
    }

    throw new TypeError('Wrong 2nd param (Options must be an object)');
  }

  throw new TypeError('Wrong 1st param (Percent must be a number, 0 - 100 range)');
};
