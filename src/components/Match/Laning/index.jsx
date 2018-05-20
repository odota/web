import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Heading from '../../Heading';
import Heatmap from '../../Heatmap';
import Table from '../../Table';
import { unpackPositionData } from '../../../utility';
import { laningColumns } from '../matchColumns';
import { StyledFlexContainer, StyledFlexElement } from '../StyledMatch';

class Laning extends React.Component {
  static propTypes = {
    match: PropTypes.shape({}),
    strings: PropTypes.shape({}),
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedPlayer: 0,
    };
  }

  setSelectedPlayer = (playerSlot) => {
    this.setState({ ...this.state, selectedPlayer: playerSlot });
  };

  render() {
    const { match, strings } = this.props;
    return (
      <StyledFlexContainer>
        <StyledFlexElement >
          <Heading title={strings.th_map} />
          <Heatmap width={400} points={unpackPositionData((match.players.find(player => player.player_slot === this.state.selectedPlayer) || {}).lane_pos)} />
        </StyledFlexElement>
        <StyledFlexElement>
          <Heading title={strings.heading_laning} />
          <Table
            data={match.players}
            columns={laningColumns(this.state, this.setSelectedPlayer)}
          />
        </StyledFlexElement>
      </StyledFlexContainer>);
  }
}

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Laning);
