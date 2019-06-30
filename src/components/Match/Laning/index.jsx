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
    const annotatedPlayers = match.players.map((p) => {
      if (!p.lh_t) {
        return p;
      }

      if (!p.dn_t) {
        return { ...p, cs_t: p.lh_t };
      }

      const csT = p.lh_t.map((v, i) => v + p.dn_t[i]);

      return { ...p, cs_t: csT };
    });

    return (
      <StyledFlexContainer>
        <StyledFlexElementFullWidth>
          <Heading title={strings.heading_laning} />
          <Table
            data={annotatedPlayers}
            columns={laningColumns(this.state, this.setSelectedPlayer)}
          />
        </StyledFlexElementFullWidth>
        <StyledFlexElement>
          <Heading
            title={strings.th_map}
            buttonLabel={process.env.ENABLE_GOSUAI ? strings.gosu_laning : null}
            buttonTo={`${sponsorURL}Laning`}
            buttonIcon={sponsorIcon}
          />
          <Heatmap width={400} points={unpackPositionData((match.players.find(player => player.player_slot === this.state.selectedPlayer) || {}).lane_pos)} />
        </StyledFlexElement>
        <StyledFlexElement>
          <Graph match={match} players={annotatedPlayers} strings={strings} selectedPlayer={this.state.selectedPlayer} />
        </StyledFlexElement>
      </StyledFlexContainer>);
  }
}

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Laning);
