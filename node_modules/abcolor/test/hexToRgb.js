import test from 'ava';
import colors from '../src/colors';
import { hexToRgb } from '../src';
import { formatRgb } from '../src/utility';

test('3-char without #', t => t.deepEqual(
  hexToRgb(colors.tri.hex),
  colors.tri.rgb
));

test('6-char with #', t => t.deepEqual(
  hexToRgb(`#${colors.six.hex}`),
  colors.six.rgb
));

test('6-char without # in % format', t => t.deepEqual(
  hexToRgb(colors.six.hex, true),
  colors.six.rgbPercent
));

test('3-char without #, css', t => t.deepEqual(
  hexToRgb(colors.tri.hex, null, true),
  `rgb(${colors.tri.rgb})`
));

test('3-char without #, percent, css', t => t.deepEqual(
  hexToRgb(colors.tri.hex, true, true),
  formatRgb(colors.tri.rgbPercent, true)
));

test('should throw an err if 1st param (Hex) is wrong', t => t.throws(
  () => hexToRgb(null)
));

test('should throw an err if 2st param (Percent) is wrong', t => t.throws(
  () => hexToRgb(colors.h3, 'percent')
));
