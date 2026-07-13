import React from "react";
import { Button } from "@mui/material";
import { connect } from "react-redux";
import { IconSteam } from "../Icons";
import config from "../../config";
import constants from "../constants";

import { HomePageProps } from "./Home";
import useStrings from "../../hooks/useStrings.hook";

const Buttons = ({ user }: HomePageProps) => {
  const strings = useStrings();
  return (
    <div>
      {!user && (
        <Button
          variant="outlined"
          startIcon={<IconSteam />}
          href={`${config.VITE_API_HOST}/login`}
          sx={{
            backgroundColor: constants.primarySurfaceColor,
            "&:hover": {
              backgroundColor: constants.primarySurfaceColor,
            },
          }}
        >
          {strings.home_login}
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { data } = state.app.metadata;
  return {
    user: data.user,
  };
};

export default connect(mapStateToProps)(Buttons);
