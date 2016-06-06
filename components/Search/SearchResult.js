import React from 'react';
import SearchResultItem from './SearchResultItem';
import { List } from 'material-ui/List';
import style from './search.css';

export default ({ players }) => {
  let playerResult = players.map((player, idx) => (
    <SearchResultItem
      key={idx}
      name={player.personaname}
      steamId={player.account_id}
      avatarFullUrl={player.avatarfull}
    />
  ));

  return (
    <List className={style.searchResult}>{playerResult}</List>
  );
};
