import * as React from 'react';

import { FormControlLabel, Switch } from '@material-ui/core';

import { useStrings } from '../../hooks/useStrings.hook';

const GamemodeToggle = () => {
  const strings = useStrings();
  const [modeFilter, setModeFilter] = React.useState(window.localStorage.getItem('modeFilter'));

  const handleToggle = React.useCallback(() => {
    if (modeFilter === 'turbo') {
      setModeFilter('');
      window.localStorage.setItem('modeFilter', '');
      window.location.reload();
    } else {
      setModeFilter('turbo');
      window.localStorage.setItem('modeFilter', 'turbo');
      window.location.reload();
    }
  }, [modeFilter, setModeFilter]);

  return (
    <FormControlLabel
      label={strings.app_show_turbo_stats}
      control={
        <Switch
          color="primary"
          checked={modeFilter === 'turbo'}
          onChange={handleToggle}
        />
      }
    />
  );
};

export default GamemodeToggle;