import React from "react";
import { connect } from "react-redux";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { toggleShowForm as toggleShowFormAction } from "../../../actions/formActions";
import GamemodeToggle from "../../GamemodeToggle/GamemodeToggle";
import config from "../../../config";
import styles from "./PlayerButtons.module.css";

type PlayerButtonsProps = {
  playerId: string;
  strings: Strings;
};

class PlayerButtons extends React.Component<
  PlayerButtonsProps,
  { disableRefresh: boolean }
> {
  state = { disableRefresh: false };

  render() {
    const { playerId, strings } = this.props;
    return (
      <div className={styles.playerButtons}>
        <div data-hint={strings.app_refresh} data-hint-position="top">
          <Button
            startIcon={<RefreshIcon />}
            disabled={this.state.disableRefresh}
            onClick={() => {
              fetch(`${config.VITE_API_HOST}/api/players/${playerId}/refresh`, {
                method: "POST",
              });
              this.setState({ disableRefresh: true });
            }}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {strings.app_refresh_label}
          </Button>
        </div>
        <Box ml="16px">
          <GamemodeToggle />
        </Box>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  showForm: state.app.form.show,
  strings: state.app.strings,
});

const mapDispatchToProps = (dispatch: any) => ({
  toggleShowForm: () => dispatch(toggleShowFormAction("tableFilter")),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerButtons);
