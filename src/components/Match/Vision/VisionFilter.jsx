import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import Table from '../../Table';
import Heading from '../../Heading';

import PlayerThumb from '../PlayerThumb';
import config from '../../../config';

const data = [
  {
    type: 'observer',
    image: <img height="24" src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/dota_react/items/ward_observer.png`} alt="Observer ward" />,
  },
  {
    type: 'sentry',
    image: <img height="24" src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/dota_react/items/ward_sentry.png`} alt="Sentry ward" />,
  },
];

class VisionFilter extends React.Component {
  static propTypes = {
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
      setTypeWard: PropTypes.func,
      checkedTypeWard: PropTypes.func,
      onCheckAllWardsTeam: PropTypes.func,
    }),
    strings: PropTypes.shape({}),
  };

  columns(index) {
    const { teams } = this.props.parent.state;
    const { strings } = this.props;
    return [
      {
        displayName: <Checkbox
          checked={teams[index === 0 ? 'radiant' : 'dire']}
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
      {
        displayName: strings.chat_filter_all,
        displayFn: row => (<Checkbox
          checked={this.props.parent.checkedTypeWard(index, row.type)}
          onCheck={() => {
            this.props.parent.setTypeWard(index, row.type);
          }
          }
        />),
      },
    ];
  }

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

  render() {
    const { strings } = this.props;
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

export default VisionFilter;
