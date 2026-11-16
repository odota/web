import React from "react";
import { connect } from "react-redux";
import Spinner from "../../Spinner/Spinner";
import Error from "../../Error/Error";
import PlayedWith from "./PlayedWith";
import { PlayerStatsCard } from "./Styled";
import useStrings from "../../../hooks/useStrings.hook";
import styles from "./PlayerStats.module.css";

export const PlayerStatsCards = ({
  loading,
  error,
  wins,
  losses,
  compact,
  playerId,
  loggedInId,
}: {
  loading: boolean;
  error: boolean;
  wins: number;
  losses: number;
  compact: boolean;
  playerId: string;
  loggedInId: string;
}) => {
  const strings = useStrings();
  if (error) {
    return <Error />;
  }
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className={styles.styled}>
      <div className={styles.container}>
        <div
          className={`${styles.statsRow}${compact ? ` ${styles.compact}` : ""}`}
        >
          <PlayerStatsCard
            className={styles.statCard}
            subheader={<div className={styles.textSuccess}>{wins}</div>}
            sx={{ paddingLeft: "0px" }}
            title={strings.th_wins}
          />
          <PlayerStatsCard
            className={styles.statCard}
            subheader={<div className={styles.textDanger}>{losses}</div>}
            title={strings.th_losses}
          />
          <PlayerStatsCard
            className={styles.statCard}
            subheader={
              wins + losses
                ? `${((wins / (wins + losses)) * 100).toFixed(2)}%`
                : strings.abbr_not_available
            }
            title={strings.th_winrate}
          />
          <PlayedWith loggedInId={loggedInId} playerId={playerId} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  loading: state.app.playerWinLoss.loading,
  error: state.app.player.error,
  wins: state.app.playerWinLoss.data.win,
  losses: state.app.playerWinLoss.data.lose,
});

export default connect(mapStateToProps)(PlayerStatsCards);
