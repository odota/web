import React from 'react';
import PropTypes from 'prop-types';
import strings from 'lang';
import Toggle from 'material-ui/Toggle';
import TeamTable from '../TeamTable';
import { purchaseTimesColumns } from '../matchColumns';

class Purchases extends React.Component {
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
    const { match } = this.props;
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
          radiantTeam={match.radiant_team}
          direTeam={match.dire_team}
        />
      </div>);
  }
}

Purchases.propTypes = {
  match: PropTypes.shape({}),
};

export default Purchases;
