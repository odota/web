import React from 'react';
import { connect } from 'react-redux';
import { player } from '../../reducers';
import styles from './PlayerHeader.css';

const PlayerPicture = ({ picture, steamLink }) => (
  <a href={steamLink}>
    <div className={styles.playerImage} style={{ backgroundImage: `url(${picture})` }} />
  </a>
);

// TODO - refactor so that account is its own reducer with its own getX() functions

const mapStateToProps = (state) => ({
  picture: player.getPicture(state),
  steamLink: player.getSteamLink(state),
});

export { PlayerPicture };

export default connect(mapStateToProps)(PlayerPicture);
