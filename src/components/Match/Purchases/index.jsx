import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
import TeamTable from '../TeamTable';
import mcs from '../matchColumns';

class Purchases extends React.Component {
  static propTypes = {
    match: PropTypes.shape({}),
    strings: PropTypes.shape({}),
  }

  constructor(props) {
    super(props);
    this.state = {
      showConsumables: false,
    };
    this.change = () => {
      const { showConsumables } = this.state;
      this.setState({ showConsumables: !showConsumables });
    };
  }

  render() {
    const { match, strings, sponsorURL, sponsorIcon } = this.props;
    const { purchaseTimesColumns } = mcs(strings);
    return (
      <div>
        <div style={{ width: '190px', margin: '10px' }}>
          <Toggle
            label={strings.show_consumables_items}
            labelStyle={{ color: '#5d6683' }}
            onToggle={this.change}
          />
        </div>
        <TeamTable
          players={match.players}
          columns={purchaseTimesColumns(match, this.state.showConsumables)}
          heading={strings.heading_purchase_log}
          buttonLabel={strings.gosu_default}
          buttonTo={`${sponsorURL}Purchases`}
          buttonIcon={sponsorIcon}
          radiantTeam={match.radiant_team}
          direTeam={match.dire_team}
        />
      </div>);
  }
}

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Purchases);
