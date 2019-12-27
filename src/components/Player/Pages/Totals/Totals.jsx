import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from './Card';
import { getPlayerTotals } from '../../../../actions';
import Container from '../../../Container';

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -8px;
  margin-right: -8px;
`;

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

const drawElement = (element, type) => {
  if (totalsToShow[element.field] === type) {
    return <Card total={element} />;
  }
  return null;
};

const Totals = ({
  data, error, loading, strings,
}) => (
  <div>
    <Container title={strings.heading_all_matches} error={error} loading={loading}>
      <CardContainer>
        {data.map(element => drawElement(element, 1))}
      </CardContainer>
    </Container>
    <Container title={strings.heading_parsed_matches} error={error} loading={loading}>
      <CardContainer>
        {data.map(element => drawElement(element, 'parsed'))}
      </CardContainer>
    </Container>
  </div>);

Totals.propTypes = {
  data: PropTypes.arrayOf({}),
  error: PropTypes.string,
  loading: PropTypes.bool,
  strings: PropTypes.shape({}),
};

const getData = (props) => {
  props.getPlayerTotals(props.playerId, props.location.search);
};

class RequestLayer extends React.Component {
  static propTypes = {
    playerId: PropTypes.string,
    location: PropTypes.shape({
      key: PropTypes.string,
    }),
    strings: PropTypes.shape({}),
  }

  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.playerId !== prevProps.playerId || this.props.location.key !== prevProps.location.key) {
      getData(this.props);
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
  strings: state.app.strings,
});

const mapDispatchToProps = dispatch => ({
  getPlayerTotals: (playerId, options) => dispatch(getPlayerTotals(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
