import React from "react";
import { useStrings } from "../../hooks/useStrings.hook";
import styles from "./Error.module.css";

const Error = (props: { text?: string }) => {
  const strings = useStrings();
  return (
    <div className={styles.errorMessage}>
      Whoops! Something went wrong. (
      {props.text ? props.text : strings.general_unknown})
    </div>
  );
};

export default Error;
