import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import Table from '../components/Table';
import strings from 'lang';
import Heading from '../components/Heading';

import PlayerThumb from '../PlayerThumb';

const data = [
  {
    type: 'observer',
    image: <img height="24" src={`${process.env.REACT_APP_API_HOST}/apps/dota2/images/items/ward_observer_lg.png`} alt="" />,
  },
  {
    type: 'sentry',
    image: <img height="24" src={`${process.env.REACT_APP_API_HOST}/apps/dota2/images/items/ward_sentry_lg.png`} alt="" />,
  },
];

export default class VisionFilter extends React.Component {
  playerColumn(playerNumber) {
    return {
      displayName: <PlayerThumb {...this.props.match.players[playerNumber]} hideText />,
      displayFn: row => (<Checkbox
        checked={this.props.parent.state.players[row.type][playerNumber]}
        onCheck={(event, checked) => {
          this.props.parent.setPlayer(playerNumber, row.type, checked);
        }
        }
      />),
    };
  }

  columns(index) {
    return [
      {
        displayName: <Checkbox
          checked={this.props.parent.state.teams[index === 0 ? 'radiant' : 'dire']}
          onCheck={(event, checked) => {
            this.props.parent.setTeam(index === 0 ? 'radiant' : 'dire', checked);
          }
          }
        />,
        displayFn: row => row.image,
      },
      this.playerColumn(0 + index),
      this.playerColumn(1 + index),
      this.playerColumn(2 + index),
      this.playerColumn(3 + index),
      this.playerColumn(4 + index),
    ];
  }

  render() {
    return (
      <div>
        <Heading title={strings.general_radiant} />
        <Table data={data} columns={this.columns(0)} />
        <Heading title={strings.general_dire} />
        <Table data={data} columns={this.columns(5)} />
      </div>
    );
  }
}

VisionFilter.propTypes = {
  match: PropTypes.shape({
    players: PropTypes.arrayOf({}),
  }),
  parent: PropTypes.shape({
    state: PropTypes.shape({
      players: PropTypes.arrayOf({}),
      teams: PropTypes.arrayOf({}),
    }),
    setPlayer: PropTypes.func,
    teams: PropTypes.arrayOf({}),
    setTeam: PropTypes.func,
  }),
};
