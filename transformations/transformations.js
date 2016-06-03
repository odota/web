import { HOST_URL } from '../yasp.config';
import moment from 'moment';

const transformation = {
  heroId: (field, heroes) => `${HOST_URL}${heroes[field].img}`,
  radiantWin: (field, playerSlot) => (playerSlot < 64 && field || playerSlot >= 64 && !field ? 'W' : 'L'),
  gameMode: (field) => (field === 22 ? 'Ranked All Pick' : 'All Pick'),
  startTime: (field) => moment.unix(field).fromNow(),
  duration: (field) => `${Math.floor(field / 60)}:${field % 60}`,
};

export default transformation;
