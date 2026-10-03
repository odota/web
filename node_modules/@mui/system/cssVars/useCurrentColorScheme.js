"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useCurrentColorScheme;
exports.getColorScheme = getColorScheme;
exports.getSystemMode = getSystemMode;
var React = _interopRequireWildcard(require("react"));
var _InitColorSchemeScript = require("../InitColorSchemeScript/InitColorSchemeScript");
var _localStorageManager = _interopRequireDefault(require("./localStorageManager"));
function noop() {}
function getSystemMode(mode) {
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function' && mode === 'system') {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.matches) {
      return 'dark';
    }
    return 'light';
  }
  return undefined;
}
function processState(state, callback) {
  if (state.mode === 'light' || state.mode === 'system' && state.systemMode === 'light') {
    return callback('light');
  }
  if (state.mode === 'dark' || state.mode === 'system' && state.systemMode === 'dark') {
    return callback('dark');
  }
  return undefined;
}
function getColorScheme(state) {
  return processState(state, mode => {
    if (mode === 'light') {
      return state.lightColorScheme;
    }
    if (mode === 'dark') {
      return state.darkColorScheme;
    }
    return undefined;
  });
}
function useCurrentColorScheme(options) {
  const {
    defaultMode = 'light',
    defaultLightColorScheme,
    defaultDarkColorScheme,
    supportedColorSchemes = [],
    modeStorageKey = _InitColorSchemeScript.DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey = _InitColorSchemeScript.DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    storageWindow = typeof window === 'undefined' ? undefined : window,
    storageManager = _localStorageManager.default,
    noSsr = false
  } = options;
  const joinedColorSchemes = supportedColorSchemes.join(',');
  const isMultiSchemes = supportedColorSchemes.length > 1;
  const modeStorage = React.useMemo(() => storageManager?.({
    key: modeStorageKey,
    storageWindow
  }), [storageManager, modeStorageKey, storageWindow]);
  const lightStorage = React.useMemo(() => storageManager?.({
    key: `${colorSchemeStorageKey}-light`,
    storageWindow
  }), [storageManager, colorSchemeStorageKey, storageWindow]);
  const darkStorage = React.useMemo(() => storageManager?.({
    key: `${colorSchemeStorageKey}-dark`,
    storageWindow
  }), [storageManager, colorSchemeStorageKey, storageWindow]);
  const [state, setState] = React.useState(() => {
    const initialMode = modeStorage?.get(defaultMode) || defaultMode;
    const lightColorScheme = lightStorage?.get(defaultLightColorScheme) || defaultLightColorScheme;
    const darkColorScheme = darkStorage?.get(defaultDarkColorScheme) || defaultDarkColorScheme;
    return {
      mode: initialMode,
      systemMode: getSystemMode(initialMode),
      lightColorScheme,
      darkColorScheme
    };
  });
  const [isClient, setIsClient] = React.useState(noSsr || !isMultiSchemes);
  React.useEffect(() => {
    setIsClient(true); // to rerender the component after hydration
  }, []);
  const colorScheme = getColorScheme(state);
  const setMode = React.useCallback(mode => {
    setState(currentState => {
      if (mode === currentState.mode) {
        // do nothing if mode does not change
        return currentState;
      }
      const newMode = mode ?? defaultMode;
      modeStorage?.set(newMode);
      return {
        ...currentState,
        mode: newMode,
        systemMode: getSystemMode(newMode)
      };
    });
  }, [modeStorage, defaultMode]);
  const setColorScheme = React.useCallback(value => {
    if (!value) {
      setState(currentState => {
        lightStorage?.set(defaultLightColorScheme);
        darkStorage?.set(defaultDarkColorScheme);
        return {
          ...currentState,
          lightColorScheme: defaultLightColorScheme,
          darkColorScheme: defaultDarkColorScheme
        };
      });
    } else if (typeof value === 'string') {
      if (value && !joinedColorSchemes.includes(value)) {
        console.error(`\`${value}\` does not exist in \`theme.colorSchemes\`.`);
      } else {
        setState(currentState => {
          const newState = {
            ...currentState
          };
          processState(currentState, mode => {
            if (mode === 'light') {
              lightStorage?.set(value);
              newState.lightColorScheme = value;
            }
            if (mode === 'dark') {
              darkStorage?.set(value);
              newState.darkColorScheme = value;
            }
          });
          return newState;
        });
      }
    } else {
      setState(currentState => {
        const newState = {
          ...currentState
        };
        const newLightColorScheme = value.light === null ? defaultLightColorScheme : value.light;
        const newDarkColorScheme = value.dark === null ? defaultDarkColorScheme : value.dark;
        if (newLightColorScheme) {
          if (!joinedColorSchemes.includes(newLightColorScheme)) {
            console.error(`\`${newLightColorScheme}\` does not exist in \`theme.colorSchemes\`.`);
          } else {
            newState.lightColorScheme = newLightColorScheme;
            lightStorage?.set(newLightColorScheme);
          }
        }
        if (newDarkColorScheme) {
          if (!joinedColorSchemes.includes(newDarkColorScheme)) {
            console.error(`\`${newDarkColorScheme}\` does not exist in \`theme.colorSchemes\`.`);
          } else {
            newState.darkColorScheme = newDarkColorScheme;
            darkStorage?.set(newDarkColorScheme);
          }
        }
        return newState;
      });
    }
  }, [joinedColorSchemes, lightStorage, darkStorage, defaultLightColorScheme, defaultDarkColorScheme]);
  const handleMediaQuery = React.useCallback(event => {
    if (state.mode === 'system') {
      setState(currentState => {
        const systemMode = event?.matches ? 'dark' : 'light';

        // Early exit, nothing changed.
        if (currentState.systemMode === systemMode) {
          return currentState;
        }
        return {
          ...currentState,
          systemMode
        };
      });
    }
  }, [state.mode]);

  // Ref hack to avoid adding handleMediaQuery as a dep
  const mediaListener = React.useRef(handleMediaQuery);
  mediaListener.current = handleMediaQuery;
  React.useEffect(() => {
    if (typeof window.matchMedia !== 'function' || !isMultiSchemes) {
      return undefined;
    }
    const handler = (...args) => mediaListener.current(...args);

    // Always listen to System preference
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    // Intentionally use deprecated listener methods to support iOS & old browsers
    media.addListener(handler);
    handler(media);
    return () => {
      media.removeListener(handler);
    };
  }, [isMultiSchemes]);

  // Handle when localStorage has changed
  React.useEffect(() => {
    if (isMultiSchemes) {
      const unsubscribeMode = modeStorage?.subscribe(value => {
        if (!value || ['light', 'dark', 'system'].includes(value)) {
          setMode(value || defaultMode);
        }
      }) || noop;
      const unsubscribeLight = lightStorage?.subscribe(value => {
        if (!value || joinedColorSchemes.match(value)) {
          setColorScheme({
            light: value
          });
        }
      }) || noop;
      const unsubscribeDark = darkStorage?.subscribe(value => {
        if (!value || joinedColorSchemes.match(value)) {
          setColorScheme({
            dark: value
          });
        }
      }) || noop;
      return () => {
        unsubscribeMode();
        unsubscribeLight();
        unsubscribeDark();
      };
    }
    return undefined;
  }, [setColorScheme, setMode, joinedColorSchemes, defaultMode, storageWindow, isMultiSchemes, modeStorage, lightStorage, darkStorage]);
  return {
    ...state,
    mode: isClient ? state.mode : undefined,
    systemMode: isClient ? state.systemMode : undefined,
    colorScheme: isClient ? colorScheme : undefined,
    setMode,
    setColorScheme
  };
}