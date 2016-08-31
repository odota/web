import React from 'react';
import { List } from 'material-ui/List';
import SearchResultItem from './SearchResultItem';
import style from './search.css';

export default ({ players }) => {
  const playerResult = players.map((player, idx) => (
    <SearchResultItem
      key={idx}
      name={player.personaname}
      steamId={player.account_id}
      avatarFullUrl={player.avatarfull}
    />
  ));

  return (
    <div className={style.searchResult}>
      <p>
        <em>There are {players.length} results</em> {/* TODO replace hardcoded text */}
      </p>
      <List>{playerResult}</List>
    </div>
  );
};
