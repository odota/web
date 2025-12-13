import React from "react";
import constants from "../constants";
import useStrings from "../../hooks/useStrings.hook";

const Error = (props: { text?: string }) => {
  const strings = useStrings();
  return (
    <div
      style={{
        backgroundColor: constants.colorDanger,
        padding: "15px",
        color: "white",
      }}
    >
      Whoops! Something went wrong. (
      {props.text ? props.text : strings.general_unknown})
    </div>
  );
};

export default Error;
