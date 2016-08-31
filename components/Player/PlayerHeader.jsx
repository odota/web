import React from 'react';
import { Card, CardActions } from 'material-ui/Card';
import PName from './PlayerName';
import PMMR from './PlayerMMR';
import PRecord from './PlayerRecord';
import styles from './PlayerHeader.css';

export default ({ playerId }) => (
  <Card>
    <div className={styles.container}>
      <PName playerId={playerId} style={{ width: '40%' }} />
      <CardActions>
        <PRecord playerId={playerId} />
        <PMMR playerId={playerId} />
      </CardActions>
    </div>
  </Card>
);
