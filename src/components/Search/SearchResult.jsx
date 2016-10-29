import React from 'react';
import { List } from 'material-ui/List';
import strings from 'lang';
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
        <em>{players.length} {strings.app_results}</em>
      </p>
      <List>{playerResult}</List>
    </div>
  );
};
