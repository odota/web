import * as React from 'react';

import { FormControlLabel, Switch } from '@material-ui/core';

import { useGamemode } from '../../context/GamemodeContext';
import { useStrings } from '../../hooks/useStrings.hook';

const GamemodeToggle = () => {
  const gamemode = useGamemode();
  const strings = useStrings();

  const handleToggle = React.useCallback(() => {
    if (gamemode.value.gamemode === 'turbo') {
      gamemode.mutations.setGamemodeToDefault();
    } else {
      gamemode.mutations.setGamemodeToTurbo();
    }
  }, [gamemode]);

  return (
    <FormControlLabel
      label={strings.app_use_turbo_label}
      control={
        <Switch
          checked={gamemode.value.gamemode === 'turbo'}
          onChange={handleToggle}
        />
      }
    />
  );
};

export default GamemodeToggle;
