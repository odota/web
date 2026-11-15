import React from "react";
import { connect } from "react-redux";
import { CircularProgress } from "../ui";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import { IconCheese } from "../Icons";
import styles from "./CheeseCircle.module.css";

const Cheese = ({
  donations = {},
  error,
  loading,
}: {
  donations: { goal?: number; cheese?: number };
  error: string;
  loading: boolean;
}) => {
  const { goal, cheese } = donations;
  const percent = cheese && goal ? (cheese / goal) * 100 : 0;

  return (
    <div>
      {error && <Error />}
      {loading && <Spinner />}
      {!error && !loading && (
        <div className={styles.progressDiv} data-hint={`${cheese} / ${goal}`}>
          <CircularProgress
            className={styles.frontProgress}
            variant="determinate"
            value={Math.min(percent, 100)}
            size={90}
          />
          <CircularProgress
            className={styles.backProgress}
            variant="determinate"
            value={100}
            size={90}
          />
          <div className={styles.cheeseDiv}>
            <IconCheese />
            <p className={styles.percentP}>{`${percent.toFixed(0)}%`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { loading, error } = state.app.metadata;
  return {
    loading,
    error,
    donations: state.app.metadata.data.cheese,
  };
};

export default connect(mapStateToProps)(Cheese);
