import React from 'react';
import { connect } from 'react-redux';
import { player } from '../../reducers';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import styles from './PlayerHeader.css';
import { Link } from 'react-router';

const getPlayerStyle = (registered, cheese) => {
  if (cheese) return styles.playerPictureCheese;
  if (registered) return styles.playerPictureYasp;
  return styles.playerPicture;
};

const getComponent = (picture, steamLink, cheese, registered, link) => {
  if (!picture) {
    return (
      <Link to={link} className={getPlayerStyle(registered, cheese)}>
        <FlatButton label="Profile" />
      </Link>
    );
  }

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

const mapStateToProps = (state, ownProps) => {
  if (!player.getPlayerById(state)) {
    return {
      noPlayer: true,
    };
  }

  return {
    picture: player.getPicture(state, ownProps.playerId),
    steamLink: player.getSteamLink(state, ownProps.playerId),
    cheese: player.getCheese(state, ownProps.playerId),
  };
};

export { PlayerPicture };

export default connect(mapStateToProps)(PlayerPicture);
