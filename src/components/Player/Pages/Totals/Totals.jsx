import React from 'react';
import { connect } from 'react-redux';
import {
  getPlayerTotals,
} from 'actions';
import Container from 'components/Container';
import strings from 'lang';
import {
  CardTitle,
} from 'material-ui/Card';
import playerStatsStyles from 'components/Player/Header/PlayerStats.css';
// import util from 'util';

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
  purchase_ward_observer: 'parsed',
  purchase_ward_sentry: 'parsed',
  purchase_gem: 'parsed',
  purchase_rapier: 'parsed',
  pings: 'parsed',
};

// Strings are in format e.g. '%d seconds'
const getAbbrTime = str => str.slice(3, 4);

const formatDurationString = (sec) => {
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec - (days * 86400)) / 3600);
  const minutes = Math.floor((sec - (days * 86400) - (hours * 3600)) / 60);
  const seconds = Math.floor((sec - (days * 86400) - (hours * 3600) - (minutes * 60)));
  return `${days}${getAbbrTime(strings.time_dd)} ${hours}${getAbbrTime(strings.time_hh)} ${minutes}${getAbbrTime(strings.time_mm)} ${seconds}${getAbbrTime(strings.time_ss)}`;
};

const drawElement = (element, type) => {
  if (totalsToShow[element.field] === type) {
    return (<CardTitle
      className={playerStatsStyles.playerStats}
      subtitle={<div>{element.field === 'duration' ? formatDurationString(element.sum) : Math.floor(element.sum).toLocaleString()}</div>}
      title={strings[`heading_${element.field}`]}
    />);
  }
  return null;
};

const Totals = ({ data, error, loading }) => (<div>
  <Container title={strings.heading_all_matches} error={error} loading={loading}>
    <div>
      {data.map(element => drawElement(element, 1))}
    </div>
  </Container>
  <Container title={strings.heading_parsed_matches} error={error} loading={loading}>
    <div>
      {data.map(element => drawElement(element, 'parsed'))}
    </div>
  </Container>
</div>);

const getData = (props) => {
  props.getPlayerTotals(props.playerId, props.location.search);
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

const mapStateToProps = state => ({
  data: state.app.playerTotals.data,
  error: state.app.playerTotals.error,
  loading: state.app.playerTotals.loading,
});

const mapDispatchToProps = dispatch => ({
  getPlayerTotals: (playerId, options) => dispatch(getPlayerTotals(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
