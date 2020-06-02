import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Heading from '../../Heading';
import Heatmap from '../../Heatmap';
import Table from '../../Table';
import { unpackPositionData } from '../../../utility';
import mcs from '../matchColumns';
import { StyledFlexContainer, StyledFlexElement, StyledFlexElementFullWidth } from '../StyledMatch';
import Graph from './Graph';

class Laning extends React.Component {
  static propTypes = {
    match: PropTypes.shape({}),
    strings: PropTypes.shape({}),
    sponsorURL: PropTypes.string,
    sponsorIcon: PropTypes.string,
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
    const {
      match, strings, sponsorURL, sponsorIcon,
    } = this.props;
    const { laningColumns } = mcs(strings);

    return (
      <StyledFlexContainer>
        <StyledFlexElementFullWidth>
          <Heading title={strings.heading_laning} />
          <Table
            data={match.players}
            columns={laningColumns(this.state, this.setSelectedPlayer)}
          />
        </StyledFlexElementFullWidth>
        <StyledFlexElement>
          <Heading
            title={strings.th_map}
            buttonLabel={process.env.REACT_APP_ENABLE_GOSUAI ? strings.gosu_laning : null}
            buttonTo={`${sponsorURL}Laning`}
            buttonIcon={sponsorIcon}
          />
          <Heatmap width={400} points={unpackPositionData((match.players.find(player => player.player_slot === this.state.selectedPlayer) || {}).lane_pos)} />
        </StyledFlexElement>
        <StyledFlexElement>
          <Graph match={match} strings={strings} selectedPlayer={this.state.selectedPlayer} />
        </StyledFlexElement>
      </StyledFlexContainer>);
  }
}

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Laning);
