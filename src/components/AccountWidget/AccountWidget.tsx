import { Button } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import config from "../../config";
import Error from "../Error/Error";
import { IconSteam } from "../Icons";
import LoggedIn from "./LoggedIn";
import useStrings from "../../hooks/useStrings.hook";

const ButtonLabel = styled.span`
  margin-left: 4px;
`;

const AccountWidget = ({
  loading,
  error,
  user,
  style,
}: {
  loading: boolean;
  error: string;
  user: any;
  style?: any;
}) => {
  const strings = useStrings();
  if (loading) return null;
  return (
    <div style={style}>
      {error && <Error />}
      {!error && !loading && user ? (
        <LoggedIn style={style} playerId={user.account_id} />
      ) : (
        <Button href={`${config.VITE_API_HOST}/login`}>
          <IconSteam />
          <ButtonLabel
            style={{
              lineHeight: "1px",
            }}
          >
            {strings.app_login}
          </ButtonLabel>
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { error, loading, data } = state.app.metadata;
  return {
    loading,
    error,
    user: data.user,
  };
};

export default connect(mapStateToProps)(AccountWidget);
