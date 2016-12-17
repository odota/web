import React from 'react';
import {
  Row,
  Col,
} from 'react-flexbox-grid';
import Checkbox from 'material-ui/Checkbox';
import Table from 'components/Table';

import PlayerThumb from '../PlayerThumb';
import styles from './Vision.css';

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

  columns(index) {
    return [
      {
        displayName: <Checkbox defaultChecked onCheck={this.handleCheckGeneratorTeam(index)} />,
        displayFn: row => row.image,
      },
      {
        displayName: <PlayerThumb {...this.props.match.players[0 + index]} hideText />,
        displayFn: row => <Checkbox defaultChecked onCheck={this.handleCheckGenerator(0 + index, row.type)} />,
      },
      {
        displayName: <PlayerThumb {...this.props.match.players[1 + index]} hideText />,
        displayFn: row => <Checkbox defaultChecked onCheck={this.handleCheckGenerator(1 + index, row.type)} />,
      },
      {
        displayName: <PlayerThumb {...this.props.match.players[2 + index]} hideText />,
        displayFn: row => <Checkbox defaultChecked onCheck={this.handleCheckGenerator(2 + index, row.type)} />,
      },
      {
        displayName: <PlayerThumb {...this.props.match.players[3 + index]} hideText />,
        displayFn: row => <Checkbox defaultChecked onCheck={this.handleCheckGenerator(3 + index, row.type)} />,
      },
      {
        displayName: <PlayerThumb {...this.props.match.players[4 + index]} hideText />,
        displayFn: row => <Checkbox defaultChecked onCheck={this.handleCheckGenerator(4 + index, row.type)} />,
      },
    ];
  }

  render() {
    return (
      <Row className={styles.visionFilter}>
        <Col xs={12} md={6}>
          <Table data={data} columns={this.columns(0)} />
        </Col>
        <Col xs={12} md={6}>
          <Table data={data} columns={this.columns(5)} />
        </Col>
      </Row>
    );
  }
}
