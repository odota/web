import React from 'react';
import { connect } from 'react-redux';
import { player } from '../../reducers';
import Avatar from 'material-ui/Avatar';
import styles from './PlayerHeader.css';

const getPlayerStyle = (registered, cheese) => {
  if (cheese) return styles.playerPictureCheese;
  if (registered) return styles.playerPictureYasp;
  return styles.playerPicture;
};

const PlayerPicture = ({ picture, steamLink, cheese, registered }) => (
  <a href={steamLink} className={getPlayerStyle(registered, cheese)}>
    <Avatar src={picture} />
  </a>
);

// TODO - refactor so that account is its own reducer with its own getX() functions

const mapStateToProps = (state) => ({
  picture: player.getPicture(state),
  steamLink: player.getSteamLink(state),
  cheese: player.getCheese(state),
});

export { PlayerPicture };

export default connect(mapStateToProps)(PlayerPicture);
