import React, { Component } from 'react';

import SearchResultItem from './SearchResultItem';

export class SearchResult extends Component {
    render() {
      const { players } = this.props

      var players_div = players.map((player) => {
        <SearchResultItem 
          steamId={player.account_id}
          name={player.personaname}
          avatarFullUrl={player.avatarfull}
          similarity={player.similarity}
        />
      });

      return (
          <div>
          {players.map((player) => 
            <SearchResultItem 
              steamId={player.account_id}
              name={player.personaname}
              avatarFullUrl={player.avatarfull}
              similarity={player.similarity}
            />
          )}
          </div>
      );
    }
}

SearchResult.propTypes = {
  players : React.PropTypes.array
}

export default SearchResult
