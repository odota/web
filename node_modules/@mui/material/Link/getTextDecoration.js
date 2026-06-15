"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _style = require("@mui/system/style");
var _colorManipulator = require("@mui/system/colorManipulator");
const getTextDecoration = ({
  theme,
  ownerState
}) => {
  const transformedColor = ownerState.color;
  if ('colorSpace' in theme && theme.colorSpace) {
    const color = (0, _style.getPath)(theme, `palette.${transformedColor}.main`) || (0, _style.getPath)(theme, `palette.${transformedColor}`) || ownerState.color;
    return theme.alpha(color, 0.4);
  }

  // check the `main` color first for a custom palette, then fallback to the color itself
  const color = (0, _style.getPath)(theme, `palette.${transformedColor}.main`, false) || (0, _style.getPath)(theme, `palette.${transformedColor}`, false) || ownerState.color;
  const channelColor = (0, _style.getPath)(theme, `palette.${transformedColor}.mainChannel`) || (0, _style.getPath)(theme, `palette.${transformedColor}Channel`);
  if ('vars' in theme && channelColor) {
    return `rgba(${channelColor} / 0.4)`;
  }
  return (0, _colorManipulator.alpha)(color, 0.4);
};
var _default = exports.default = getTextDecoration;