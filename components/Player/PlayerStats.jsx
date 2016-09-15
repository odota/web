import React from 'react';
import { connect } from 'react-redux';
import { CardTitle } from 'material-ui/Card';
import { red400, lightGreen400 } from 'material-ui/styles/colors';
import Error from '../Error';
import Spinner from '../Spinner';
import { player } from '../../reducers';
import styles from './PlayerHeader.css';

export const PlayerMMR = ({ loading, error, partyRank, soloRank, mmrEstimate, wins, losses }) => {
  const getPlayerMMR = () => {
    if (error) return <Error />;
    if (loading) return <Spinner />;

    const card = {
      general: {
        display: 'inline-block',
        padding: 0,
        marginRight: '25px',
        marginTop: '20px',
      },
      title: {
        fontSize: '24px',
        color: 'rgba(255, 255, 255, 0.87)',
        lineHeight: '36px',
      },
      subtitle: {
        fontSize: '14px',
        color: 'rgba(255, 255, 255, 0.54)',
        lineHeight: 1,
        textTransform: 'uppercase',
      },
    };

    return (
      <div style={{ position: 'absolute' }}>
        <CardTitle
          style={card.general} subtitleStyle={card.title} titleStyle={card.subtitle}
          subtitle={<span style={{ color: lightGreen400 }}>{wins}</span>} title="wins"
        />
        <CardTitle
          style={card.general} subtitleStyle={card.title} titleStyle={card.subtitle}
          subtitle={<span style={{ color: red400 }}>{losses}</span>} title="losses"
        />
        <CardTitle
          style={card.general} subtitleStyle={card.title} titleStyle={card.subtitle}
          subtitle={`${((wins / (wins + losses)) * 100).toFixed(2)}%`} title="winrate"
        />
        {soloRank ? <CardTitle
          style={card.general} subtitleStyle={card.title} titleStyle={card.subtitle}
          subtitle={soloRank || 'N/A'} title="Solo MMR"
        /> : null}
        {partyRank ? <CardTitle
          style={card.general} subtitleStyle={card.title} titleStyle={card.subtitle}
          subtitle={partyRank || 'N/A'} title="Party MMR"
        /> : null}
        {mmrEstimate.estimate ? <CardTitle
          style={card.general} subtitleStyle={card.title} titleStyle={card.subtitle}
          subtitle={mmrEstimate.estimate || 'N/A'} title="estimate MMR"
        /> : null}
      </div>
    );
  };

  return (
    <div className={styles.mmrContainer}>
      {getPlayerMMR()}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  loading: player.getLoading(state, ownProps.playerId),
  error: player.getError(state, ownProps.playerId),
  partyRank: player.getCompetitiveRank(state, ownProps.playerId),
  soloRank: player.getSoloMmrEstimate(state, ownProps.playerId),
  mmrEstimate: player.getMmrEstimate(state, ownProps.playerId),
  wins: player.getWins(state, ownProps.playerId),
  losses: player.getLosses(state, ownProps.playerId),
});


export default connect(mapStateToProps)(PlayerMMR);
