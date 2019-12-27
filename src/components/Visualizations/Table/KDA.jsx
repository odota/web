import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { KDAContainer, TitleContainer, KDAPercentContainer } from './Styled';
import constants from '../../constants';

const KDA = ({
  kills, deaths, assists, strings,
}) => {
  const kdaSum = kills + deaths + assists;

  return (
    <KDAContainer>
      <TitleContainer style={{ marginLeft: '10px' }}>
        {kills}
      </TitleContainer>
      <KDAPercentContainer
        data-hint={`${strings.th_kda}: ${Number(((kills + assists) / (deaths + 1)).toFixed(2))}`}
        data-hint-position="top"
      >
        <div style={{ width: `${(kills * 100) / kdaSum}%`, backgroundColor: constants.colorGreen }} />
        <div style={{ width: `${(deaths * 100) / kdaSum}%`, backgroundColor: constants.colorRed }} />
        <div style={{ width: `${(assists * 100) / kdaSum}%`, backgroundColor: constants.colorBlueGray }} />
      </KDAPercentContainer>
    </KDAContainer>
  );
};

const { number, shape } = PropTypes;

KDA.propTypes = {
  kills: number,
  deaths: number,
  assists: number,
  strings: shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(KDA);
