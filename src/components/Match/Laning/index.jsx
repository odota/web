import React from 'react';
import PropTypes from 'prop-types';
import strings from 'lang';
import Heading from 'components/Heading';
import Heatmap from 'components/Heatmap';
import Table from 'components/Table';
import { unpackPositionData } from 'utility';
import { laningColumns } from 'components/Match/matchColumns';
import { StyledFlexContainer, StyledFlexElement } from '../StyledMatch';

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
    return (<StyledFlexContainer>
      <StyledFlexElement >
        <Heading title={strings.th_map} />
        <Heatmap width={400} points={unpackPositionData(match.players[this.state.selectedPlayer].lane_pos)} />
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

Laning.propTypes = {
  match: PropTypes.object,
};

export default Laning;
