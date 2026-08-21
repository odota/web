import { getPath } from '@mui/system/style';
import { alpha } from '@mui/system/colorManipulator';
const getTextDecoration = ({
  theme,
  ownerState
}) => {
  const transformedColor = ownerState.color;
  if ('colorSpace' in theme && theme.colorSpace) {
    const color = getPath(theme, `palette.${transformedColor}.main`) || getPath(theme, `palette.${transformedColor}`) || ownerState.color;
    return theme.alpha(color, 0.4);
  }

  // check the `main` color first for a custom palette, then fallback to the color itself
  const color = getPath(theme, `palette.${transformedColor}.main`, false) || getPath(theme, `palette.${transformedColor}`, false) || ownerState.color;
  const channelColor = getPath(theme, `palette.${transformedColor}.mainChannel`) || getPath(theme, `palette.${transformedColor}Channel`);
  if ('vars' in theme && channelColor) {
    return `rgba(${channelColor} / 0.4)`;
  }
  return alpha(color, 0.4);
};
export default getTextDecoration;