import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { getPlayerMatches } from '../../../../actions';
import { useGamemode } from '../../../../context/GamemodeContext';
import Container from '../../../Container';
import Table from '../../../Table';
import playerMatchesColumns from './playerMatchesColumns';

const Matches = ({ data, error, loading, strings }) => (
  <Container title={strings.heading_matches} error={error} loading={loading}>
    <Table
      paginated
      columns={playerMatchesColumns(strings, true)}
      data={data}
    />
  </Container>
);
Matches.propTypes = {
  data: PropTypes.arrayOf({}),
  error: PropTypes.string,
  loading: PropTypes.bool,
  strings: PropTypes.shape({}),
};

const getData = (props, gamemode) => {
  let params = props.location.search;
  if (gamemode === 'turbo') {
    params = `${props.location.search}&game_mode=23`;
  }
  props.getPlayerMatches(props.playerId, params);
};

const RequestLayer = (props) => {
  const gamemodeState = useGamemode();
  React.useEffect(() => {
    if (gamemodeState.value.gamemode) {
      getData(props, gamemodeState.value.gamemode);
    }
  }, [props, gamemodeState.value]);

  return <Matches {...props} />;
};

RequestLayer.propTypes = {
  location: PropTypes.shape({
    key: PropTypes.string,
  }),
  playerId: PropTypes.string,
  strings: PropTypes.shape({}),
};

const defaultOptions = {
  limit: null,
};

const mapStateToProps = (state) => ({
  data: state.app.playerMatches.data,
  loading: state.app.playerMatches.loading,
  error: state.app.playerMatches.error,
  strings: state.app.strings,
});

const mapDispatchToProps = (dispatch) => ({
  getPlayerMatches: (playerId, options = defaultOptions) =>
    dispatch(getPlayerMatches(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
