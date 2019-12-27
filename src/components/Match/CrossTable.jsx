import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import heroes from 'dotaconstants/build/heroes.json';
import ReactTooltip from 'react-tooltip';
import { abbreviateNumber } from '../../utility';
import { IconRadiant, IconDire } from '../Icons';
import constants from '../constants';
import HeroImage from '../Visualizations/HeroImage';


const StyledDiv = styled.div`

table {
  border-collapse: separate !important;
  border-spacing: 0px 0px !important;
  padding: 3px !important;
  background-color: ${constants.secondarySurfaceColor};
  width: 100%;
  background-color: rgba(255, 255, 255, 0.03);
}

tr {
  background-color: rgba(0, 0, 0, 0.019);
}

td {
  padding: 0px !important;
  height: 48px;
  white-space: normal !important;
  text-align: center; 
  &:not(:last-child) {
    border-right: 1px solid rgba(255, 255, 255, 0.04);
  }
}

tr:not(:first-child) td{
  @media screen and (max-width: ${constants.wrapMobile}) {
    padding-top: 5px !important;
    padding-bottom: 5px !important;
  }
}

tr:not(:first-child) td {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

tr:first-child td:first-child {
  background-color: rgba(0, 0, 0, 0.27) !important;
}

tr:first-child td:not(:first-child) {
  background: linear-gradient(to bottom, ${constants.tableHeaderSurfaceColor} 15% , rgba(35, 0, 0, 0.3) 100%) !important;
}

td > div {
  text-align: center;
}

td:first-child {
  width: 30px !important;
}

tr:first-child {
  height: 30px !important;

  & td {
    height: 30px !important;
  }
}

tr:not(:first-child) td:first-child {
border-right: 1px solid ${constants.colorMutedGreen} !important;
  background: linear-gradient(to right, ${constants.tableHeaderSurfaceColor} 15% , rgba(0, 35, 0, 0.3) 100%) !important;
  & > div {
    position: relative;
    top: 3px;
    left: 1px;
  }
}

tr:first-child td {
  & > div {
    position: relative;
    top: 2px;
  }
}

tr:nth-child(2) td:not(:first-child) {
  border-top: 1px solid ${constants.colorMutedRed} !important;
}

.value-1 {
  display: inline-block;
  background: rgba(0, 3, 0, 0.3);
  width: 38px;
  height: 21px;
  margin: 1px 1px 1px 1px;
  text-align: center;
  border: 1px solid ${constants.colorMutedGreen};
  color: ${constants.colorMutedLight};

  &:nth-child(2) {
    border: 1px solid ${constants.colorMutedRed} !important;
    background: rgba(3, 0, 0, 0.3) !important;
  }

  & span {
    vertical-align: middle;
  }
}

.hero img {
  width: 25px;
}

.team {
  margin: auto;
  width: 25px;

  & svg {
    margin: 0 !important;
  }
}
`;

const CrossTable = ({
  match,
  field1,
  field2,
  strings,
}) => (
  <StyledDiv>
    <table selectable={false} >
      <tbody displayRowCheckbox={false}>
        <tr>
          <td />
          {match.players.slice(match.players.length / 2, match.players.length).map(player => (
            <td key={player.hero_id}>
              <div className="hero">
                {heroes[player.hero_id] && <HeroImage id={player.hero_id} isIcon data-tip={heroes[player.hero_id] && heroes[player.hero_id].localized_name} />}
              </div>
            </td>))}
          <td>
            <div className="team">
              <IconDire data-tip={strings.general_dire} />
            </div>
          </td>
        </tr>
        {match.players.slice(0, match.players.length / 2).map(player => (
          <tr key={player.hero_id}>
            <td>
              <div className="hero">
                {heroes[player.hero_id] && <HeroImage id={player.hero_id} isIcon data-tip={heroes[player.hero_id] && heroes[player.hero_id].localized_name} />}
              </div>
            </td>
            {match.players.slice(match.players.length / 2, match.players.length).map((player2) => {
              const hero1 = heroes[player.hero_id] || {};
              const hero2 = heroes[player2.hero_id] || {};
              const pfield1 = player[field1] || {};
              const pfield2 = player[field2] || {};
              const pvalue1 = pfield1[hero2.name] || 0;
              const pvalue2 = pfield2[hero2.name] || 0;
              return (
                <td key={player2.hero_id}>
                  <div data-tip data-for={`${field1}_${field2}_${player.player_slot}_${player2.player_slot}`}>
                    <div className="value-1" style={{ color: pvalue1 > pvalue2 ? constants.primaryTextColor : '' }}><span>{abbreviateNumber(pvalue1)}</span></div>
                    <div className="value-1" style={{ color: pvalue2 > pvalue1 ? constants.primaryTextColor : '' }}><span>{abbreviateNumber(pvalue2)}</span></div>
                    <ReactTooltip id={`${field1}_${field2}_${player.player_slot}_${player2.player_slot}`} place="top" effect="solid">
                      {`${hero1.localized_name} → ${hero2.localized_name}: ${pvalue1}`}
                      <br />
                      {`${hero2.localized_name} → ${hero1.localized_name}: ${pvalue2}`}
                    </ReactTooltip>
                  </div>
                </td>);
            })}
            {(() => {
              const hero1 = heroes[player.hero_id] || {};
              let ptotal1 = 0;
              let ptotal2 = 0;

              match.players.slice(match.players.length / 2, match.players.length).forEach((player2) => {
                const hero2 = heroes[player2.hero_id] || {};
                ptotal1 += (player[field1] && hero2.name in player[field1]) ? player[field1][hero2.name] : 0;
                ptotal2 += (player[field2] && hero2.name in player[field2]) ? player[field2][hero2.name] : 0;
              });

              return (
                <td key={`${player.hero_id}_totals`}>
                  <div data-tip data-for={`${field1}_${field2}_${player.player_slot}_radiant`}>
                    <div className="value-1" style={{ color: ptotal1 > ptotal2 ? constants.primaryTextColor : '' }}><span>{abbreviateNumber(ptotal1)}</span></div>
                    <div className="value-1" style={{ color: ptotal2 > ptotal1 ? constants.primaryTextColor : '' }}><span>{abbreviateNumber(ptotal2)}</span></div>
                    <ReactTooltip id={`${field1}_${field2}_${player.player_slot}_radiant`} place="top" effect="solid">
                      {`${hero1.localized_name} → ${strings.general_dire}: ${ptotal1}`}
                      <br />
                      {`${strings.general_dire} → ${hero1.localized_name}: ${ptotal2}`}
                    </ReactTooltip>
                  </div>
                </td>
              );
            })()}
          </tr>))}
        <tr>
          <td>
            <div className="team">
              <IconRadiant data-tip={strings.general_radiant} />
            </div>
          </td>
          { match.players.slice(match.players.length / 2, match.players.length).map((player) => {
            const hero1 = heroes[player.hero_id] || {};
            let ptotal1 = 0;
            let ptotal2 = 0;

            match.players.slice(0, match.players.length / 2).forEach((player2) => {
              const hero2 = heroes[player2.hero_id] || {};
              ptotal1 += (player[field1] && hero2.name in player[field1]) ? player[field1][hero2.name] : 0;
              ptotal2 += (player[field2] && hero2.name in player[field2]) ? player[field2][hero2.name] : 0;
            });

            return (
              <td key={`${player.hero_id}_totals`}>
                <div data-tip data-for={`${field1}_${field2}_${player.player_slot}_dire`}>
                  <div className="value-1" style={{ color: ptotal2 > ptotal1 ? constants.primaryTextColor : '' }}><span>{abbreviateNumber(ptotal2)}</span></div>
                  <div className="value-1" style={{ color: ptotal1 > ptotal2 ? constants.primaryTextColor : '' }}><span>{abbreviateNumber(ptotal1)}</span></div>
                  <ReactTooltip id={`${field1}_${field2}_${player.player_slot}_dire`} place="top" effect="solid">
                    {`${strings.general_radiant} → ${hero1.localized_name}: ${ptotal2}`}
                    <br />
                    {`${hero1.localized_name} → ${strings.general_radiant}: ${ptotal1}`}
                  </ReactTooltip>
                </div>
              </td>
            );
          }) }
          {(() => {
            let radiantTotal = 0;
            let direTotal = 0;

            match.players.slice(match.players.length / 2, match.players.length).forEach((player) => {
              const hero = heroes[player.hero_id] || {};
              match.players.slice(0, match.players.length / 2).forEach((player2) => {
                const hero2 = heroes[player2.hero_id] || {};
                radiantTotal += (player2[field1] && hero.name in player2[field1]) ? player2[field1][hero.name] : 0;
                direTotal += (player[field1] && hero2.name in player[field1]) ? player[field1][hero2.name] : 0;
              });
            });

            return (
              <td>
                <div data-tip data-for={`${field1}_${field2}_total`}>
                  <div className="value-1" style={{ color: radiantTotal > direTotal ? constants.primaryTextColor : '' }}><span>{abbreviateNumber(radiantTotal)}</span></div>
                  <div className="value-1" style={{ color: direTotal > radiantTotal ? constants.primaryTextColor : '' }}><span>{abbreviateNumber(direTotal)}</span></div>
                  <ReactTooltip id={`${field1}_${field2}_total`} place="top" effect="solid">
                    {`${strings.general_radiant} → ${strings.general_dire}: ${radiantTotal}`}
                    <br />
                    {`${strings.general_dire} → ${strings.general_radiant}: ${direTotal}`}
                  </ReactTooltip>
                </div>
              </td>
            );
          })()}
        </tr>
      </tbody>
    </table>
  </StyledDiv>);

CrossTable.propTypes = {
  match: PropTypes.shape({}),
  field1: PropTypes.string,
  field2: PropTypes.string,
  strings: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(CrossTable);
