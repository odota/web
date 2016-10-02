import React from 'react';
import {
  Tabs,
  Tab
} from 'material-ui/Tabs';
import {
  heroes
} from 'dotaconstants';
import {
  API_HOST
} from 'config';
import Table from '../Table/Table';

const CastTable = ({
  match,
  dataField,
  columns
}) => (
  <Tabs>
    {match.players.map((p) =>
      (
      <Tab key={p.player_slot} icon={<img src={`${API_HOST}${heroes[p.hero_id].img}`} height={30} role="presentation" />}>
        <Table
          data={p[dataField] || []}
          columns={columns}
        />
      </Tab>
      ))
    }
  </Tabs>);

export default CastTable;