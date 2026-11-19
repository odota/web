"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useLayerOrder;
var _useEnhancedEffect = _interopRequireDefault(require("@mui/utils/useEnhancedEffect"));
var _useId = _interopRequireDefault(require("@mui/utils/useId"));
var _GlobalStyles = _interopRequireDefault(require("../GlobalStyles"));
var _useThemeWithoutDefault = _interopRequireDefault(require("../useThemeWithoutDefault"));
var _jsxRuntime = require("react/jsx-runtime");
/**
 * This hook returns a `GlobalStyles` component that sets the CSS layer order (for server-side rendering).
 * Then on client-side, it injects the CSS layer order into the document head to ensure that the layer order is always present first before other Emotion styles.
 */function useLayerOrder(theme) {
  const upperTheme = (0, _useThemeWithoutDefault.default)();
  const id = (0, _useId.default)() || '';
  const {
    modularCssLayers
  } = theme;
  let layerOrder = 'mui.global, mui.components, mui.theme, mui.custom, mui.sx';
  if (!modularCssLayers || upperTheme !== null) {
    // skip this hook if upper theme exists.
    layerOrder = '';
  } else if (typeof modularCssLayers === 'string') {
    layerOrder = modularCssLayers.replace(/mui(?!\.)/g, layerOrder);
  } else {
    layerOrder = `@layer ${layerOrder};`;
  }
  (0, _useEnhancedEffect.default)(() => {
    const head = document.querySelector('head');
    if (!head) {
      return;
    }
    const firstChild = head.firstChild;
    if (layerOrder) {
      // Only insert if first child doesn't have data-mui-layer-order attribute
      if (firstChild && firstChild.hasAttribute?.('data-mui-layer-order') && firstChild.getAttribute('data-mui-layer-order') === id) {
        return;
      }
      const styleElement = document.createElement('style');
      styleElement.setAttribute('data-mui-layer-order', id);
      styleElement.textContent = layerOrder;
      head.prepend(styleElement);
    } else {
      head.querySelector(`style[data-mui-layer-order="${id}"]`)?.remove();
    }
  }, [layerOrder, id]);
  if (!layerOrder) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GlobalStyles.default, {
    styles: layerOrder
  });
}