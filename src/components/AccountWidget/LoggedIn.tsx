import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui";
import Spinner from "../Spinner/Spinner";
import useStrings from "../../hooks/useStrings.hook";
import styles from "./LoggedIn.module.css";

const LoggedIn = ({
  playerId,
  style,
}: {
  playerId: number;
  style: React.CSSProperties;
}) => {
  const strings = useStrings();
  if (!playerId) {
    return <Spinner size={0.5} />;
  }
  return (
    <Link style={style} to={`/players/${playerId}`}>
      <Button className={styles.styledButton}>{strings.app_my_profile}</Button>
    </Link>
  );
};

export default LoggedIn;
