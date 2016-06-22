import Table from './Table';
import PlayerMatchesTable from './PlayerMatchesTable.container';
import PlayerHeroesTable from './PlayerHeroesTable.container';
import MatchTable from './MatchTable.container';
import createTable from './tableContainerFactory';

console.log('hi there', createTable);

export default Table;
export { PlayerMatchesTable, PlayerHeroesTable, MatchTable, Table, createTable };
