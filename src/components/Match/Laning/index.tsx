import React from 'react';
import { connect } from 'react-redux';
import Heading from '../../Heading';
import Heatmap from '../../Heatmap/Heatmap';
import Table from '../../Table';
import { unpackPositionData } from '../../../utility';
import mcs from '../matchColumns';
import {
  StyledFlexContainer,
  StyledFlexElement,
  StyledFlexElementFullWidth,
} from '../StyledMatch';
import Graph from './Graph';
import config from '../../../config';

type LaningProps = {
    match: Match,
    strings: Strings,
    sponsorURL: string,
    sponsorIcon: string,
  };

class Laning extends React.Component<LaningProps, { selectedPlayer: number }> {
  constructor(props: LaningProps) {
    super(props);
    this.state = {
      selectedPlayer: 0,
    };
  }

  setSelectedPlayer = (playerSlot: number) => {
    this.setState({ ...this.state, selectedPlayer: playerSlot });
  };

  defaultSort = (r1: any, r2: any) => {
    if (r1.isRadiant !== r2.isRadiant) {
      return 1;
    }

    return r1.lane - r2.lane;
  };

  render() {
    const { match, strings, sponsorURL, sponsorIcon } = this.props;
    const { laningColumns } = mcs(strings);

    const tableData = [...match.players].sort(this.defaultSort);

    return (
      <StyledFlexContainer>
        <StyledFlexElementFullWidth>
          <Heading title={strings.heading_laning} />
          <Table
            data={tableData}
            columns={laningColumns(this.state, this.setSelectedPlayer)}
          />
        </StyledFlexElementFullWidth>
        <StyledFlexElement>
          <Heading
            title={strings.th_map}
            buttonLabel={config.VITE_ENABLE_GOSUAI ? strings.gosu_laning : undefined}
            buttonTo={`${sponsorURL}Laning`}
            buttonIcon={sponsorIcon}
          />
          <Heatmap
            width={400}
            startTime={match.start_time}
            points={unpackPositionData(
              (
                match.players.find(
                  (player) => player.player_slot === this.state.selectedPlayer,
                ) || {}
              ).lane_pos,
            )}
          />
        </StyledFlexElement>
        <StyledFlexElement>
          <Graph
            match={match}
            selectedPlayer={this.state.selectedPlayer}
          />
        </StyledFlexElement>
      </StyledFlexContainer>
    );
  }
}

const mapStateToProps = (state: any) => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Laning);
