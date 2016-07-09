import React from 'react';
import { connect } from 'react-redux';
import { createTable } from '../../Table';
import {
  getPlayerMatches,
  setPlayerMatchesSort,
  getPlayerHeroes,
  setPlayerHeroesSort,
} from '../../../actions';
import { playerMatchesColumns, playerHeroesColumns } from '../../Table/columnDefinitions';
import {
  sortPlayerMatches,
  transformPlayerMatchesById,
  sortPlayerHeroes,
  transformPlayerHeroesById,
} from '../../../selectors';
import { playerMatches, playerHeroes } from '../../../reducers';

const MatchesTable = createTable(
  playerMatches.getPlayerMatchesById,
  (state, sortState, playerId) => (sortState ? sortPlayerMatches(playerId)(state) : transformPlayerMatchesById(playerId)(state)),
  setPlayerMatchesSort
);
const HeroesTable = createTable(
  playerHeroes.getPlayerHeroesById,
  (state, sortState, playerId) => (sortState ? sortPlayerHeroes(playerId)(state) : transformPlayerHeroesById(playerId)(state)),
  setPlayerHeroesSort
);

const mapStateToProps = (state, { playerId }) => ({ playerId });

const getData = props => {
  props.getPlayerMatches(props.playerId);
  props.getPlayerHeroes(props.playerId);
};

class RequestLayer extends React.Component {
  componentDidMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId) {
      getData(this.props);
    }
  }

  render() {
    return (
      <div>
        <MatchesTable columns={playerMatchesColumns} id={this.props.playerId} />
        <HeroesTable columns={playerHeroesColumns} id={this.props.playerId} />
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  getPlayerMatches,
  getPlayerHeroes,
})(RequestLayer);
