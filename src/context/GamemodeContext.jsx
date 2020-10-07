import * as React from 'react';

const GamemodeContext = React.createContext({
  value: {
    gamemode: null,
  },
  mutations: {
    setGamemodeTo: () => null,
    setGamemodeToDefault: () => null,
    setGamemodeToTurbo: () => null,
  },
});

export const GamemodeConsumer = GamemodeContext.Consumer;
export const GamemodeProvider = ({ children }) => {
  const [gamemode, setGamemode] = React.useState(null);

  const setGamemodeTo = React.useCallback(
    (newGamemode) => {
      setGamemode(newGamemode);
      window.localStorage.setItem('gamemode', newGamemode);
    },
    [setGamemode]
  );

  const setGamemodeToDefault = React.useCallback(() => {
    setGamemodeTo('default');
  }, [setGamemodeTo]);

  const setGamemodeToTurbo = React.useCallback(() => {
    setGamemodeTo('turbo');
  }, [setGamemodeTo]);

  React.useEffect(() => {
    const val = window.localStorage.getItem('gamemode');
    if (val) {
      setGamemode(val);
    } else {
      window.localStorage.setItem('gamemode', 'default');
    }
  }, []);

  const state = {
    value: {
      gamemode,
    },
    mutations: {
      setGamemodeTo,
      setGamemodeToDefault,
      setGamemodeToTurbo,
    },
  };

  return (
    <GamemodeContext.Provider value={state}>
      {children}
    </GamemodeContext.Provider>
  );
};

export const useGamemode = () => {
  return React.useContext(GamemodeContext);
};

export default GamemodeContext;
