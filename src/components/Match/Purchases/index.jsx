import React from 'react';
import PropTypes from 'prop-types';
import strings from 'lang';
import TeamTable from 'components/Match/TeamTable';
import Toggle from 'material-ui/Toggle';
import { purchaseTimesColumns } from 'components/Match/matchColumns';

class Purchases extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCommItems: false,
    };
    this.change = () => {
      const { showCommItems } = this.state;
      this.setState({ showCommItems: !showCommItems });
    };
  }

  render() {
    const { match } = this.props;
    return (
      <div>
        <div style={{ width: '180px', margin: '10px' }}>
          <Toggle
            label={strings.hide_consumables_items}
            labelStyle={ {color: '#5d6683'} }
            defaultToggled
            onToggle={this.change}
          />
        </div>
        <TeamTable
          players={match.players}
          columns={purchaseTimesColumns(match, this.state.showCommItems)}
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
