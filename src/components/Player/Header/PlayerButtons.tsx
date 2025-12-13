import React from "react";
import { connect } from "react-redux";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import styled from "styled-components";
import { toggleShowForm as toggleShowFormAction } from "../../../actions/formActions";
import GamemodeToggle from "../../GamemodeToggle/GamemodeToggle";
import config from "../../../config";

const Styled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  font-size: 14px;

  @media only screen and (max-width: 660px) {
    justify-content: center;

    & a {
      min-width: 50px !important;
    }

    & button {
      min-width: 50px !important;
    }

    & * {
      margin: auto !important;
    }

    & span {
      margin: 0 !important;
    }
  }
`;

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
      <Styled>
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
          >
            {strings.app_refresh_label}
          </Button>
        </div>
        <Box ml="16px">
          <GamemodeToggle />
        </Box>
      </Styled>
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
