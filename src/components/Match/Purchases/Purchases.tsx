import React from "react";
import { connect } from "react-redux";
import { FormControlLabel, Switch } from "@mui/material";
import TeamTable from "../TeamTable";
import mcs from "../matchColumns";
import config from "../../../config";

type PurchasesProps = {
  match: Match;
  strings: Strings;
};

class Purchases extends React.Component<
  PurchasesProps,
  { showConsumables: boolean }
> {
  constructor(props: PurchasesProps) {
    super(props);
    this.state = {
      showConsumables: false,
    };
  }

  change = () => {
    const { showConsumables } = this.state;
    this.setState({ showConsumables: !showConsumables });
  };

  render() {
    const { match, strings } = this.props;
    const { purchaseTimesColumns } = mcs(strings);
    return (
      <div style={{ position: "relative" }}>
        <FormControlLabel
          label={strings.show_consumables_items}
          control={
            <Switch
              // style={toggleStyle}
              onChange={this.change}
              // thumbStyle={{
              //   backgroundColor: 'rgb(179, 179, 179)',
              //   marginTop: '2px',
              //   marginRight: '3px',
              // }}
              // trackStyle={{
              //   position: 'absolute',
              //   marginTop: '2px',
              //   marginRight: '3px',
              // }}
            />
          }
        />
        <TeamTable
          players={match.players}
          columns={purchaseTimesColumns(match, this.state.showConsumables)}
          heading={strings.heading_purchase_log}
          // buttonLabel={config.VITE_ENABLE_GOSUAI ? strings.gosu_default : null}
          // buttonTo={`${sponsorURL}Purchases`}
          // buttonIcon={sponsorIcon}
          radiantTeam={match.radiant_team}
          direTeam={match.dire_team}
          radiantWin={match.radiant_win}
          overflowAuto
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Purchases);
