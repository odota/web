import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
import TeamTable from '../TeamTable';
import mcs from '../matchColumns';
import config from '../../../config';

const toggleStyle = {
  width: '30px',
  float: 'right',
  position: 'absolute',
  right: '100px',
  top: '-12px',
  border: '1px solid rgba(179, 179, 179, 0.1)',
  padding: '6px',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  borderRadius: '5px',
};

class Purchases extends React.Component {
  static propTypes = {
    match: PropTypes.shape({}),
    strings: PropTypes.shape({}),
    sponsorURL: PropTypes.string,
    sponsorIcon: PropTypes.string,
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
    const {
      match, strings, sponsorURL, sponsorIcon,
    } = this.props;
    const { purchaseTimesColumns } = mcs(strings);
    return (
      <div style={{ position: 'relative' }}>
        <Toggle
          label={strings.show_consumables_items}
          labelStyle={{ color: '#b3b3b3', lineHeight: '13px', fontSize: '14px' }}
          style={toggleStyle}
          onToggle={this.change}
          thumbStyle={{ backgroundColor: 'rgb(179, 179, 179)', marginTop: '2px', marginRight: '3px' }}
          trackStyle={{ position: 'absolute', marginTop: '2px', marginRight: '3px' }}
        />
        <TeamTable
          players={match.players}
          columns={purchaseTimesColumns(match, this.state.showConsumables)}
          heading={strings.heading_purchase_log}
          buttonLabel={config.VITE_ENABLE_GOSUAI ? strings.gosu_default : null}
          buttonTo={`${sponsorURL}Purchases`}
          buttonIcon={sponsorIcon}
          radiantTeam={match.radiant_team}
          direTeam={match.dire_team}
          radiantWin={match.radiant_win}
          overflowAuto
        />
      </div>);
  }
}

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Purchases);
