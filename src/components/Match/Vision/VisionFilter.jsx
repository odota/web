/* global API_HOST */
import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import Table from 'components/Table';
import strings from 'lang';
import Heading from 'components/Heading';

import PlayerThumb from '../PlayerThumb';
// import styles from './Vision.css';

const data = [
  {
    type: 'observer',
    image: <img height="24" src={`${API_HOST}/apps/dota2/images/items/ward_observer_lg.png`} role="presentation" />,
  },
  {
    type: 'sentry',
    image: <img height="24" src={`${API_HOST}/apps/dota2/images/items/ward_sentry_lg.png`} role="presentation" />,
  },
];

export default class VisionFilter extends React.PureComponent {
  handleCheckGenerator(player, type) {
    const parent = this.props.parent;

    return event => parent.setPlayer(player, type, event.target.checked);
  }

  handleCheckGeneratorTeam(index) {
    const parent = this.props.parent;

    return event => parent.setTeam(index === 0 ? 'radiant' : 'dire', event.target.checked);
  }

  playerColumn(playerNumber) {
    return {
      displayName: <PlayerThumb {...this.props.match.players[playerNumber]} hideText />,
      displayFn: row => <Checkbox defaultChecked onCheck={this.handleCheckGenerator(playerNumber, row.type)} />,
    };
  }

  columns(index) {
    return [
      {
        displayName: <Checkbox defaultChecked onCheck={this.handleCheckGeneratorTeam(index)} />,
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
