import test from 'ava';
import colors from '../src/colors';
import { hexToHsl } from '../src';

test('3-char without #', t => t.deepEqual(
  hexToHsl(colors.tri.hex),
  colors.tri.hsl
));
