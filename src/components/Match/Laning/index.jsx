import React from 'react';
import strings from 'lang';
import Heading from 'components/Heading';
import Heatmap from 'components/Heatmap';
import Table from 'components/Table';
import { unpackPositionData } from 'utility';
import { laningColumns } from 'components/Match/matchColumns';

class Laning extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlayer: 0,
    };
    this.setSelectedPlayer = this.setSelectedPlayer.bind(this);
  }
  setSelectedPlayer(index) {
    this.setState({ ...this.state, selectedPlayer: index });
  }
  render() {
    const { match } = this.props;
    return (<div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div style={{ flexGrow: '1' }}>
        <Heading title={strings.th_map} />
        <Heatmap points={unpackPositionData(match.players[this.state.selectedPlayer].lane_pos)} />
      </div>
      <div style={{ flexGrow: '1' }}>
        <Heading title={strings.heading_laning} />
        <Table
          data={match.players}
          columns={laningColumns(this.state, this.setSelectedPlayer)}
        />
      </div>
    </div>);
  }
}

export default Laning;
