import React from 'react';
import { connect } from 'react-redux';
import { player } from '../../reducers';
import Avatar from 'material-ui/Avatar';
import styles from './PlayerHeader.css';
import { Link } from 'react-router';

const getPlayerStyle = (registered, cheese) => {
  if (cheese) return styles.playerPictureCheese;
  if (registered) return styles.playerPictureYasp;
  return styles.playerPicture;
};

const getComponent = (picture, steamLink, cheese, registered, link) => {
  if (link) {
    return (
      <Link to={link} className={getPlayerStyle(registered, cheese)}>
        <Avatar src={picture} />
      </Link>
    );
  }
  return (
    <a href={steamLink} className={getPlayerStyle(registered, cheese)}>
      <Avatar src={picture} />
    </a>
  );
};

const PlayerPicture = ({ picture, steamLink, cheese, registered, link }) =>
  getComponent(picture, steamLink, cheese, registered, link);

// TODO - refactor so that account is its own reducer with its own getX() functions

const mapStateToProps = (state, ownProps) => ({
  picture: player.getPicture(state, ownProps.user),
  steamLink: player.getSteamLink(state, ownProps.user),
  cheese: player.getCheese(state, ownProps.user),
});

export { PlayerPicture };

export default connect(mapStateToProps)(PlayerPicture);
