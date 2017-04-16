import React from 'react';
import { connect } from 'react-redux';
import {
  getPlayerTotals,
} from 'actions';
import { playerTotals } from 'reducers';
import Container from 'components/Container';
import strings from 'lang';
import {
  CardTitle,
} from 'material-ui/Card';
import playerStatsStyles from 'components/Player/Header/PlayerStats.css';

const totalsToShow = {
  kills: 1,
  deaths: 1,
  assists: 1,
  last_hits: 1,
  denies: 1,
  duration: 1,
  level: 1,
  hero_damage: 1,
  tower_damage: 1,
  hero_healing: 1,
  stuns: 'parsed',
  tower_kills: 'parsed',
  neutral_kills: 'parsed',
  courier_kills: 'parsed',
  purchase_tpscroll: 'parsed',
  purchase_observer: 'parsed',
  purchase_sentry: 'parsed',
  purchase_gem: 'parsed',
  purchase_rapier: 'parsed',
  pings: 'parsed',
};

// TODO format duration more nicely
// TODO indicate if data is incomplete (for parsed fields)

const Totals = ({ data, error, loading }) => (<div>
  <Container title={strings.heading_totals} error={error} loading={loading}>
    <div>
      {data.map(element => ((element.field in totalsToShow) ? <CardTitle
        className={playerStatsStyles.playerStats}
        subtitle={<div>{Math.floor(element.sum).toLocaleString()}</div>}
        title={strings[`heading_${element.field}`]}
      /> : null))}
    </div>
  </Container>
</div>);

const getData = (props) => {
  props.getPlayerTotals(props.playerId, props.location.query);
};

class RequestLayer extends React.Component {
  componentDidMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId || this.props.location.key !== nextProps.location.key) {
      getData(nextProps);
    }
  }

  render() {
    return <Totals {...this.props} />;
  }
}

const mapStateToProps = (state, { playerId }) => ({
  data: playerTotals.getTotalsList(state, playerId),
  error: playerTotals.getError(state, playerId),
  loading: playerTotals.getLoading(state, playerId),
});

const mapDispatchToProps = dispatch => ({
  getPlayerTotals: (playerId, options) => dispatch(getPlayerTotals(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
