import { metadataActions, getMetadata } from './metadataActions';
import { playerActions, getPlayer } from './playerActions';
import { matchActions, getMatch } from './matchActions';

const config = require('../config');
const HOST_URL = config.HOST_URL;

export {
  metadataActions,
  getMetadata,
  playerActions,
  getPlayer,
  matchActions,
  getMatch,
  HOST_URL,
};
