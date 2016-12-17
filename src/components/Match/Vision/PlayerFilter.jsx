import React from 'react';
import {
  Row,
  Col,
} from 'react-flexbox-grid';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/RaisedButton';
import {
  grey800 as filterOff,
  blueGrey700 as filterOn,
} from 'material-ui/styles/colors';
import styles from '../Match.css'; // extract filters from there

import { heroTd } from '../matchColumns';


export default class PlayerFilter extends React.PureComponent {
  constructor(props) {
    super(props);

    this.getObserverCount = () => this.props.player.obs_log.length;
    this.getSentryCount = () => this.props.player.sen_log.length;

    this.getMuiThemeProps = () => ({
      fullWidth: true,
      disabledBackgroundColor: filterOff,
    });
  }

  generateFilterKey(type) {
    return `${this.props.player.player_slot}-${type}`;
  }

  render() {
    const {
      player,
      onFilterClick,
    } = this.props;

    const obsCount = this.getObserverCount();
    const senCount = this.getSentryCount();
    const [opacityOn, opacityOff] = [1, 0.4];

    return (
      <Row
        className={styles.filterRow}
        middle="xs"
        between="xs"
      >
        <Col xs={12} sm={7}>
          <Row xs>
            <Col>{heroTd(player)}</Col>
          </Row>
        </Col>
        <Col xs={12} sm={5}>
          <Row>
            <Col xs>
              <Button
                {...this.getMuiThemeProps()}
                label={obsCount}
                disabled={!obsCount}
                backgroundColor={this.generateFilterKey('observer') in this.props.activeFilters ? filterOff : filterOn}
                style={{ opacity: obsCount > 0 ? opacityOn : opacityOff }}
                onClick={() => onFilterClick(this.generateFilterKey('observer'), player.player_slot, 'observer')}
                icon={<Avatar size={24} src={`${API_HOST}/apps/dota2/images/items/ward_observer_lg.png`} />}
              />
            </Col>
            <Col xs>
              <Button
                {...this.getMuiThemeProps()}
                label={senCount}
                disabled={!senCount}
                backgroundColor={this.generateFilterKey('sentry') in this.props.activeFilters ? filterOff : filterOn}
                style={{ opacity: senCount > 0 ? opacityOn : opacityOff }}
                onClick={() => onFilterClick(this.generateFilterKey('sentry'), player.player_slot, 'sentry')}
                icon={<Avatar size={24} src={`${API_HOST}/apps/dota2/images/items/ward_sentry_lg.png`} />}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
