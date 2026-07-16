import React from "react";
import { useStrings } from "../../hooks/useStrings.hook";
import styled from "@emotion/styled";
import constants from "../constants";

const ErrorMessage = styled.div`
  font-family: ${constants.fontFamilyFuturistic};
  font-size: ${constants.fontSizeMedium};
  color: ${constants.colorYelor};
`;

const Error = (props: { text?: string }) => {
  const strings = useStrings();
  return (
    <ErrorMessage>
      Whoops! Something went wrong. (
      {props.text ? props.text : strings.general_unknown})
    </ErrorMessage>
  );
};

export default Error;
